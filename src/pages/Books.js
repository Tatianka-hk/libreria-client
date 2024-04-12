import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react"
import axios from 'axios';
import Edit from "../style/images/edit.png"
import Delete from "../style/images/delete.png"
function Books(){
    const { t } = useTranslation();


    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(async()=>{
        await axios.get('http://localhost:4000/books/get',
        { headers: { accessToken: localStorage.getItem("token") }
    }).then((res)=>{
        if(res.data.mes === "no"){
            window.location.href="/"
        }else{
            setBooks(res.data.books)
            console.log(books)
        }
    })
    }, [])
    return(
        <div class="user_main">
  <div class="input_container">
            <input class="input_for_search"
  type="text"
  placeholder={t('input_search')}
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
</div>
            <div class = "books">
            {books .filter((book) => {
    const matchName = book.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAuthor = book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchName || matchAuthor;
  }).map((book, index) => (

        <div class ="book_info">
            <div class="book">
        <div class="book_title">
       <b>{book.name} - {book.author}</b> 
        </div>
        <h3>{t('description')}</h3>
        <div class="book_description">
            {book.short_description}
        </div>
        </div>
        <div class = "book_optional">
        <button class="want_to_read" onClick={()=>{window.location.href=`/edit/book/:${book.id}`}}><img class="edit_image" src={Edit} alt="Edit" /> </button>
        <button class="want_to_read" onClick={()=>{window.location.href=`/edit/book/:${book.id}`}}><img class="edit_image" src={Delete} alt="Delete" /> </button>
        {/* <button class="want_to_read"   onClick={book.gl? () =>del_gl(book.id) : () => make_gl(book.id)} style={{ color: book.gl ? "white" : "black" }} >{t('want_to_read')}</button> */}
            </div>
            <hr class="book_separator"></hr>
    </div>
      ))}
                

            </div>
        </div>
    )
}
export default Books;