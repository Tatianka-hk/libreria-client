import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import '../style/index.css';
function EditDataUser() {
  const [error, setError] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t } = useTranslation();

  useEffect(async () => {
    await axios
      .get('http://localhost:4000/auth/get_user', {
        headers: { accessToken: localStorage.getItem('token') }
      })
      .then((res) => {
        if (res.data.mes === 'no') {
          window.location.href = '/';
        } else {
          console.log(res);
          setLogin(res.data.login);
          setEmail(res.data.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!login) {
      setError(`${t('errorNoLogin')}`);
      return false;
    }
    if (!email) {
      setError(`${t('errorNoEmail')}`);
      return false;
    }
    if (login.length < 5) {
      setError(`${t('loginIsInvalid')}`);
      return false;
    }
    if (!emailRegex.test(email)) {
      setError(`${t('emailIsInvalid')}`);
      return false;
    }

    return true;
  };

  const validatePass = () => {
    if (!password) {
      setError(`${t('errorNoPassword')}`);
      return false;
    }
    if (password.length < 8) {
      setError(`${t('passwordIsInvalid')}`);
      return false;
    }
    return true;
  };

  const send = async () => {
    if (!validate()) {
      return false;
    }
    await axios
      .put(
        'http://localhost:4000/auth/edit_user',
        {
          login,
          email
        },
        { headers: { accessToken: localStorage.getItem('token') } }
      )
      .then((res) => {
        res.data.mes === 'no' ? (window.location.href = '/') : (window.location.href = '/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendPassword = async () => {
    if (!validatePass()) {
      return false;
    }
    await axios
      .put(
        'http://localhost:4000/auth/user/edit_pass',
        { password },
        { headers: { accessToken: localStorage.getItem('token') } }
      )
      .then((res) => {
        res.data.mes === 'no' ? (window.location.href = '/') : (window.location.href = '/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAdmin = async () => {
    await axios
      .delete('http://localhost:4000/auth/delete_user', {
        headers: { accessToken: localStorage.getItem('token') }
      })
      .then((res) => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="admin_main1">
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
        <div className="enter_but marg">
          {' '}
          <button
            onClick={() => {
              send();
            }}
            className="enter"
          >
            {t('edit_data')}
          </button>
        </div>
        <input
          className="auto_input"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder={t('editPassword')}
        ></input>
        <div className="enter_but marg">
          {' '}
          <button
            onClick={() => {
              sendPassword();
            }}
            className="enter"
          >
            {t('edit_password')}
          </button>
        </div>
        <div className="enter_but enter_mb">
          {' '}
          <button
            onClick={() => {
              if (window.confirm(t('want_to_delete_account_admin'))) {
                deleteAdmin();
              }
            }}
            className="enter"
          >
            {t('want_to_delete_account_admin')}
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditDataUser;
