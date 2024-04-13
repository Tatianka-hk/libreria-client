import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';

import axios from 'axios';
function Admin() {
  const { t } = useTranslation();
  useEffect(async () => {
    await axios
      .get('http://localhost:4000/auth/admin_check', {
        headers: { accessToken: localStorage.getItem('token') }
      })
      .then((res) => {
        if (res.data.mes === 'no') {
          window.location.href = '/';
        }
      });
  }, []);

  return (
    <div className="admin_main">
      <div className="admin_buttons">
        <button
          className="admin_button"
          onClick={() => {
            window.location.href = 'add/admin';
          }}
        >
          {t('add_admin')}
        </button>
        <button
          className="admin_button"
          onClick={() => {
            window.location.href = '/users';
          }}
        >
          {t('users')}
        </button>
        <button
          className="admin_button"
          onClick={() => {
            window.location.href = '/books';
          }}
        >
          {t('books')}
        </button>
        <button
          className="admin_button"
          onClick={() => {
            window.location.href = '/add/book';
          }}
        >
          {t('add_book')}
        </button>
        <button
          className="admin_button"
          onClick={() => {
            window.location.href = '/edit/data';
          }}
        >
          {t('books')}
        </button>
      </div>
    </div>
  );
}

export default Admin;
