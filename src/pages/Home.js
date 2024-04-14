import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Star from '../components/Start';
import Lupa from '../style/images/lupa.png';
function Home() {
  const { t } = useTranslation();

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

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

  // useEffect(()=>{console.log(selectedGenre)},selectedGenre )

  const makeFav = async (bid) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}/user/add_to_favorites`,
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
  const makeGl = async (bid) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}/user/want_to_read`,
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

  const delGl = async (bid) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}/user/delete_from_gl`,
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
      <div className="filters">
        <div className="filter_container">
          <select
            className="genre_filter"
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="">All Genres</option>
            <option value="Comedia">Comedia</option>
            <option value="Realism">Realism</option>
            <option value="fantasy">Fantasy</option>
            {/* Add more genre options as needed */}
          </select>
        </div>

        <div className="input_container">
          <img src={Lupa} style={{ height: '2vh' }} />
          <input
            className="input_for_search"
            type="text"
            placeholder={t('input_search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="books">
        {books
          .filter((book, index) => {
            const matchName = book.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchAuthor = book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchGenre = selectedGenre === '' || book.genre === selectedGenre;
            return (matchName || matchAuthor) && matchGenre;
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
                <h3>{t('description')}</h3>
                <div className="book_description">{book.short_description}</div>
              </div>
              <div className="book_optional">
                <button
                  className="want_to_read"
                  onClick={book.fav ? () => delFav(book.id) : () => makeFav(book.id)}
                >
                  {' '}
                  <Star size="15vh" color={book.fav ? 'white' : 'black'}></Star>{' '}
                </button>
                <button
                  className="want_to_read"
                  onClick={book.gl ? () => delGl(book.id) : () => makeGl(book.id)}
                  style={{ color: book.gl ? 'white' : 'black' }}
                >
                  {t('want_to_read')}
                </button>
              </div>
              <hr className="book_separator"></hr>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
