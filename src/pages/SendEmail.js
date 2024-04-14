import React from "react";
import axios from "axios";
import  { useState } from 'react';
import '../style/auto.css';
import { useTranslation } from 'react-i18next';
function SendEmail(){
    const { t } = useTranslation();

    const [inputEmail, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputEmail) {
          setError(t("errorNoEmail"));
          return false;
        }
        if (!emailRegex.test(inputEmail)) {
          setError(t('emailIsInvalid'));
          return false;
        }
    
        return true;
      };
    
      const send = async () => {
        try {
          if (!validate()) return false;
          const res = await axios.post(`${process.env.REACT_APP_URL}/email/send`, {
            email: inputEmail,
          });
          if (res.data.mes==="si") {
            setMessage(t('send_email_part2'))
            console.log( res.data.email)
            localStorage.setItem("email", res.data.email)
          } 
          else {
            setError('Error');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
    return(
    <div className="main">
    <div className="auto_block">
        <div class="send_email_m1">{t('send_email_part1')}</div>
      <input
        className="auto_input"
        type="email"
        value={inputEmail}
        onChange={(e)=>{setEmail(e.target.value)}}
        placeholder={t('inputEmail')}
      ></input>
       <div className="auto_error">{error}</div>
        <div className="enter_but">
          {' '}
          <button onClick={send} className="enter">
            {t('send_email')}
          </button>
          
        </div>
        <div class="send_email_m2">{message}</div>
      </div>
    </div>
    )
}
export default SendEmail;