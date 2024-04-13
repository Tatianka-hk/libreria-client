import React, { useState } from 'react';
import '../style/auto.css';
import axios from 'axios';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
function Login() {
  const { t } = useTranslation();

  const [inputLog, selLog] = useState('');
  const [inputPas, sePas] = useState('');
  const [errorA, setError] = useState('');

  const handleInputChange = (event) => {
    selLog(event.target.value);
  };

  const handleInputChange1 = (event) => {
    sePas(event.target.value);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => responseGoogle(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const responseGoogle = async (response) => {
    try {
      console.log(response);
      await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` }
        })
        .then(async (response) => {
          const res = await axios.post('http://localhost:4000/auth/login_with_login', {
            email: response.data.email,
            login: response.data.name
          });
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            window.location.href = '/home';
          } else {
            setError('Error');
          }
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const send = async () => {
    try {
      const res = await axios.post('http://localhost:4000/auth/login', {
        login: inputLog,
        password: inputPas
      });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        if (res.data.role === 'user') {
          window.location.href = '/home';
        } else {
          window.location.href = '/admin';
        }
      } else {
        setError(res.data);
      }
      console.log('Response:', res.data);
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
          type="password"
          value={inputPas}
          onChange={handleInputChange1}
          placeholder={t('inputPassword')}
        ></input>
        <div className="auto_error">{errorA}</div>
        <div className="enter_but">
          {' '}
          <button onClick={send} className="enter">
            {t('login_ent')}
          </button>
        </div>
        <GoogleLogin
          buttonText="Login with Google"
          onSuccess={login}
          onFailure={responseGoogle}
          // cookiePolicy={'single_host_origin'}
          // isSignedIn={true}
        />
      </div>
    </div>
  );
}
export default Login;
