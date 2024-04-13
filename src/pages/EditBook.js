import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import '../style/index.css';
function EditBooks() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGentre] = useState('');
  const [sd, setSD] = useState(''); // short description
  const [ld, setLD] = useState(''); // long description

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
          setName(res.data.book.name);
          setAuthor(res.data.book.author);
          setGentre(res.data.book.genre);
          setSD(res.data.book.short_description);
          setLD(res.data.book.long_description);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const send = async () => {
    const url = window.location.href;
    const parts = url.split('/');
    const bookId = parts[parts.length - 1];
    await axios
      .put(
        `http://localhost:4000/books/edit/${bookId}`,
        {
          name,
          author,
          genre,
          short_description: sd,
          long_description: ld
        },
        { headers: { accessToken: localStorage.getItem('token') } }
      )
      .then((res) => {
        res.data.mes === 'no' ? (window.location.href = '/') : (window.location.href = '/books');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="admin_main">
      <div className="auto_block">
        <div className="inputs">
          <input
            className="auto_input frst"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder={t('book_name')}
          ></input>
          <input
            className="auto_input"
            type="text"
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
            placeholder={t('book_author')}
          ></input>
          <input
            className="auto_input"
            type="text"
            value={genre}
            onChange={(event) => {
              setGentre(event.target.value);
            }}
            placeholder={t('book_genre')}
          ></input>
        </div>
        <textarea
          className="sd_textarea auto_input textarea_mb"
          type="text"
          value={sd}
          onChange={(event) => {
            setSD(event.target.value);
          }}
          placeholder={t('book_sd')}
        ></textarea>
        <textarea
          className="auto_input ld_textarea textarea_mb"
          type="text"
          value={ld}
          onChange={(event) => {
            setLD(event.target.value);
          }}
          placeholder={t('book_ld')}
        ></textarea>

        <div className="auto_error">{error}</div>
        <div className="enter_but">
          {' '}
          <button
            onClick={() => {
              send();
            }}
            className="enter"
          >
            {t('edit_book')}
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditBooks;
