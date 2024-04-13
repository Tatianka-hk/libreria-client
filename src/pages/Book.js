import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Book() {
  const [book, setBook] = useState({});

  const { t } = useTranslation();

  useEffect(async () => {
    const url = window.location.href;
    const parts = url.split('/');
    const bookId = parts[parts.length - 1];

    await axios
      .get(`http://localhost:4000/books/get/${bookId}`, {
        headers: { accessToken: localStorage.getItem('token') }
      })
      .then((res) => {
        if (res.data.mes === 'no') {
          window.location.href = '/';
        } else {
          setBook(res.data.book);
          console.log(book);
        }
      });
  }, []);
  return (
    <div className="admin_main">
      <div className="book_title">
        <b>
          {book.name} - {book.author}
        </b>
      </div>
      <div className="genre">
        {t('genre')}: {book.genre}
      </div>
      <div className="Long_description">
        {t('description')}: {book.long_description}
      </div>
    </div>
  );
}

export default Book;
