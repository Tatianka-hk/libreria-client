import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function AddAdminPage() {
  const { t } = useTranslation();

  const [inputLog, selLog] = useState('');
  const [inputPas, sePas] = useState('');
  const [inputEmail, setPEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/auth/admin_check`, {
        headers: { accessToken: localStorage.getItem('token') }
      })
      .then((res) => {
        if (res.data.mes === 'no') {
          window.location.href = '/';
        }
      });
  }, []);

  const handleInputChange = (event) => {
    selLog(event.target.value);
  };

  const handleInputChange1 = (event) => {
    sePas(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setPEmail(event.target.value);
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputLog) {
      setError(`${t('errorNoLogin')}`);
      return false;
    }
    if (!inputEmail) {
      setError(`${t('errorNoEmail')}`);
      return false;
    }
    if (!inputPas) {
      setError(`${t('errorNoPassword')}`);
      return false;
    }
    if (inputLog.length < 5) {
      setError(`${t('loginIsInvalid')}`);
      return false;
    }
    if (inputPas.length < 8) {
      setError(`${t('passwordIsInvalid')}`);
      return false;
    }
    if (!emailRegex.test(inputEmail)) {
      setError(`${t('emailIsInvalid')}`);
      return false;
    }

    return true;
  };

  const send = async () => {
    try {
      if (!validate()) return false;
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/auth/add_admin`,
        {
          login: inputLog,
          email: inputEmail,
          password: inputPas
        },
        { headers: { accessToken: localStorage.getItem('token') } }
      );
      if (res.data.mes === 'yes') {
        window.location.href = '/admin';
      } else {
        setError('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin_main">
      <div className="form">
        <input
          className="auto_input frst"
          type="text"
          value={inputLog}
          onChange={handleInputChange}
          placeholder={t('inputLoging')}
        ></input>
        <input
          className="auto_input"
          type="email"
          value={inputEmail}
          onChange={handleInputChange2}
          placeholder={t('inputEmail')}
        ></input>
        <input
          className="auto_input"
          type="password"
          value={inputPas}
          onChange={handleInputChange1}
          placeholder={t('inputPassword')}
        ></input>
        <div className="enter_but">
          {' '}
          <button onClick={send} className="enter">
            {t('add_admin')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAdminPage;
