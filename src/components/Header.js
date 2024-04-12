import React, { useState }  from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Header() {
    const location = useLocation();
    const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const { t } = useTranslation();

  const handleChange = (event) => {
    const lang = event.target.value;
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const logout=()=>{
    localStorage.clear()
    window.location.href="/"
  }

  const isBookPage = /^\/book\/[^/]+$/.test(location.pathname);

    return (
      <div className="header">
        <div className="left-section">Libreria</div>
        <div className="right-section"> 
        <select class = "lang_select" value={selectedLanguage} onChange={handleChange}>
      <option value="en">English</option>
      <option value="uk">Українська</option>
    </select>
        {location.pathname === '/' && ( 
        <div className="reg_buttons mb">
          <div className="reg_button">  <Link class = "link_auto" to="/login"> login</Link></div>
          <div className="reg_button"> <Link class = "link_auto" to="/registration">  sign up </Link></div>
        </div>
      )}
        {location.pathname === '/home' && ( 
        <div className="reg_buttons mb">
          <div className="reg_button" onClick={logout}> logout</div>
          <div className="reg_button" onClick={()=>{ window.location.href="/favs"}}> favs</div>
          <div className="reg_button" onClick={()=>{window.location.href="/want_to_read"}}> want to read</div>
        </div>
      )}{(location.pathname === '/favs' || location.pathname === '/want_to_read' || isBookPage) && ( 
        <div className="reg_buttons mb">
          <div className="reg_button" onClick={()=>{ window.location.href="/home"}}> {t('home')}</div>
        </div>
      )}{location.pathname === '/admin' && ( 
        <div className="reg_buttons mb">
          <div className="reg_button" onClick={logout}> logout</div>
        </div>
      )}
      {(location.pathname === '/add/admin' || location.pathname === '/users' || location.pathname === '/books' ) && ( 
        <div className="reg_buttons mb">
          <div className="reg_button" onClick={()=>{ window.location.href="/admin"}}> {t('home')}</div>
        </div>
      )}
      </div>
      </div>
    );
  }
  
  export default Header;