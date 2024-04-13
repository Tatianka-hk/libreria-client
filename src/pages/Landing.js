import start from '../style/images/start.png';
import '../style/landing.css';
import { useTranslation } from 'react-i18next';
import React from 'react';
function Landing() {
  const { t } = useTranslation();
  return (
    <div className="main">
      <div className="intro">
        <img id="langing_page" src={start} alt="langing_page"></img>
        <div className="intro_text mb"> {t('greeting')}</div>
      </div>
      <div className="buttons_r">
        <button
          className="auto"
          onClick={() => {
            window.location.href = '/login';
          }}
        >
          Entrar
        </button>
        <button
          className="auto"
          onClick={() => {
            window.location.href = '/registration';
          }}
        >
          Registrar
        </button>
      </div>
    </div>
  );
}
export default Landing;
