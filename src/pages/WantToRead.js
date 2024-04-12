import { useEffect, useState } from "react"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function WantToRead(){
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    const { t } = useTranslation();


    useEffect(async()=>{
        await axios.get('http://localhost:4000/user/see_want_to_read',
        { headers: { accessToken: localStorage.getItem("token") }
    }).then((res)=>{
        console.log(res)
        if(res.data.mes === "no"){
            window.location.href="/"
        }else{
            setBooks(res.data.books)
            console.log(books)
        }
    })
    }, [])


    const del_gl = async(bid)=>{
        await axios.post('http://localhost:4000/user/delete_from_gl',
        { id: bid },
        {
            headers: { accessToken: localStorage.getItem("token") }
        }).then((res)=>{
            console.log("o")
            if(res.data.mes === "no"){
                window.location.href="/"
            }else{
                console.log("aqui")
                window.location.reload()
            }
        })
    }


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
           <Link class="book_link" to={`/book/${book.id}`}><b>{book.name} - {book.author}</b> </Link>
        </div>
        <h3>Dicription</h3>
        <div class="book_description">
            {book.short_description}
        </div>
        </div>
        <div class = "book_optional">
        <button class="want_to_read"   onClick={() =>del_gl(book.id)} style={ {color:"white" }} >{t('want_to_read')}</button>
            </div>
            <hr class="book_separator"></hr>
    </div>
      ))}
                

            </div>
        </div>
    )
}

export default WantToRead;