import { useEffect, useState } from "react"
import axios from 'axios';
import { useTranslation } from 'react-i18next';
function Book(){
    const [book, setBook] = useState({});

    const { t } = useTranslation();

    useEffect(async()=>{
        const url = window.location.href;
        const parts = url.split("/");
        const book_id = parts[parts.length - 1];
        console.log(book_id)
        await axios.get(`http://localhost:4000/books/get/${book_id}`,
        { headers: { accessToken: localStorage.getItem("token") }
    }).then((res)=>{
        if(res.data.mes === "no"){
            window.location.href="/"
        }else{
            setBook(res.data.book)
            console.log(book)
        }
    })
    }, [])
    return(
    <div class="user_main">
          <div class="book_title">
        <b>{book.name} - {book.author}</b> 
     </div>
     <div class="genre">
     {t('genre')}: {book.genre}
     </div>
     <div class="Long_description">
     {t('description')}: {book.long_description}
     </div>
    </div>
    )
}

export default Book;
