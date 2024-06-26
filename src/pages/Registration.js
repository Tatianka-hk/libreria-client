import React, { useState } from 'react';
import '../style/auto.css';
import axios from 'axios';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
function Registration() {
  const { t } = useTranslation();

  const [inputLog, selLog] = useState('');
  const [inputPas, sePas] = useState('');
  const [inputEmail, setPEmail] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    selLog(event.target.value);
  };

  const handleInputChange1 = (event) => {
    sePas(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setPEmail(event.target.value);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => responseGoogle(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const responseGoogle = async (response) => {
    try {
      await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` }
        })
        .then(async (response) => {
          const res = await axios.post(`${process.env.REACT_APP_URL}/auth/register_with_login`, {
            email: response.data.email,
            login: response.data.name
          });
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            window.location.href = '/home';
          }else if(res.data.errorUniqueEmail){
            setError(t('errorUniqueEmail'))
          } else {
            setError('Error');
          }
        });
    } catch (error) {
      console.error('Error:', error);
    }
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
      const res = await axios.post(`${process.env.REACT_APP_URL}/auth/register`, {
        login: inputLog,
        email: inputEmail,
        password: inputPas
      });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        window.location.href = '/home';
      } else if(res.data.errorUniqueEmail){
        setError(t('errorUniqueEmail'))
      } else if(res.data.errorUniqueLogin){
      setError(t('errorUniqueLogin'))
    }
      else {
        setError('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="main">
      <div className="auto_block">
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
        <div className="auto_error">{error}</div>
        <div className="enter_but">
          {' '}
          <button onClick={send} className="enter">
            {t('reg_ent')}
          </button>
        </div>
        <div class="auth_app">
        <GoogleLogin
          buttonText="Signup with Google"
          onSuccess={login}
          onFailure={responseGoogle}
          // cookiePolicy={'single_host_origin'}
          // isSignedIn={true}
        />
        </div>
      </div>
    </div>
  );
}
export default Registration;
