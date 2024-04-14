import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Star from '../components/Start';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Favs() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { t } = useTranslation();

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/user/see_fav`, {
        headers: { accessToken: localStorage.getItem('token') }
      })
      .then((res) => {
        console.log(res);
        if (res.data.mes === 'no') {
          window.location.href = '/';
        } else {
          setBooks(res.data.books);
          console.log(books);
        }
      });
  }, []);

  const delFav = async (bid) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}/user/delete_from_favorite`,
        { id: bid },
        {
          headers: { accessToken: localStorage.getItem('token') }
        }
      )
      .then((res) => {
        console.log('o');
        if (res.data.mes === 'no') {
          window.location.href = '/';
        } else {
          console.log('aqui');
          window.location.reload();
        }
      });
  };

  return (
    <div className="user_main">
      <div className="input_container">
        <input
          className="input_for_search"
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
                  <Link class="book_link" to={`/book/${book.id}`}>
                    <b>
                      {book.name} - {book.author}
                    </b>{' '}
                  </Link>
                </div>
                <h3>Dicription</h3>
                <div className="book_description">{book.short_description}</div>
              </div>
              <div className="book_optional">
                <button className="want_to_read" onClick={() => delFav(book.id)}>
                  {' '}
                  <Star size="15vh" color={'white'}></Star>{' '}
                </button>
              </div>
              <hr className="book_separator"></hr>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Favs;
