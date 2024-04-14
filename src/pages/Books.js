import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Edit from '../style/images/edit.png';
import Delete from '../style/images/delete.png';
import Lupa from '../style/images/lupa.png';
function Books() {
  const { t } = useTranslation();

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/books/get`, {
        headers: { accessToken: localStorage.getItem('token') }
      })
      .then((res) => {
        if (res.data.mes === 'no') {
          window.location.href = '/';
        } else {
          setBooks(res.data.books);
        }
      });
  }, []);

  const deleteBook = async (bookId) => {
    await axios
      .delete(`http://localhost:4000/books/delete/${bookId}`, {
        headers: { accessToken: localStorage.getItem('token') }
      })
      .then((res) => {
        if (res.data.mes === 'no') {
          window.location.href = '/';
        } else {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="user_main">
      <div className="input_container ">
        <img src={Lupa} style={{ height: '2vh' }} />
        <input
          className="input_for_search mb_margin"
          type="text"
          placeholder={t('input_search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="books">
        {books
          .filter((book, index) => {
            const matchName = book.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchAuthor = book.author.toLowerCase().includes(searchTerm.toLowerCase());
            return matchName || matchAuthor;
          })
          .map((book, index) => (
            <div className="book_info">
              <div className="book">
                <div className="book_title">
                  <b>
                    {book.name} - {book.author}
                  </b>
                </div>
                <h3>{t('description')}</h3>
                <div className="book_description">{book.short_description}</div>
              </div>
              <div className="book_optional b_o_a">
                <button
                  className="want_to_read"
                  onClick={() => {
                    window.location.href = `/edit/book/${book.id}`;
                  }}
                >
                  <img className="edit_image" src={Edit} alt="Edit" />{' '}
                </button>
                <button
                  className="want_to_read"
                  onClick={() => {
                    if (window.confirm(t('want_to_delete_book'))) {
                      deleteBook(book.id);
                    }
                  }}
                >
                  {' '}
                  <img className="edit_image" src={Delete} alt="Delete" />
                </button>
              </div>
              <hr className="book_separator"></hr>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Books;
