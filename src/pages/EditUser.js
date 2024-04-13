import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import '../style/index.css';
function EditUser() {
  const [error, setError] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');

  const { t } = useTranslation();

  useEffect(async () => {
    const url = window.location.href;
    const parts = url.split('/');
    const userId = parts[parts.length - 1];
    await axios
      .get(`http://localhost:4000/user/get/${userId}`, {
        headers: { accessToken: localStorage.getItem('token') }
      })
      .then((res) => {
        if (res.data.mes === 'no') {
          window.location.href = '/';
        } else {
          setLogin(res.data.user.login);
          setEmail(res.data.user.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const send = async () => {
    const url = window.location.href;
    const parts = url.split('/');
    const userId = parts[parts.length - 1];
    await axios
      .put(
        `http://localhost:4000/user/edit/${userId}`,
        {
          login,
          email
        },
        { headers: { accessToken: localStorage.getItem('token') } }
      )
      .then((res) => {
        res.data.mes === 'no' ? (window.location.href = '/') : (window.location.href = '/users');
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
            value={login}
            onChange={(event) => {
              setLogin(event.target.value);
            }}
            placeholder={t('editLoging')}
          ></input>
          <input
            className="auto_input"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder={t('editEmail')}
          ></input>
        </div>

        <div className="auto_error">{error}</div>
        <div className="enter_but">
          {' '}
          <button
            onClick={() => {
              send();
            }}
            className="enter"
          >
            {t('edit_user')}
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditUser;
