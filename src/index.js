import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Footer from './components/Footer';
import Header from './components/Header';

import Landing from './pages/Landing';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import Favs from './pages/Fav';
import WantToRead from './pages/WantToRead';
import Book from './pages/Book';
import AddAdminPage from './pages/AddAdminPage';
import Admin from './pages/Admin';
import Books from './pages/Books';
import EditBooks from './pages/EditBook';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import AddBook from './pages/AddBook';
import EditData from './pages/EditData';
import EditDataUser from './pages/EditDataUser';
import SendEmail from './pages/SendEmail';

import reportWebVitals from './reportWebVitals';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favs" element={<Favs />} />
            <Route path="/want_to_read" element={<WantToRead />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/add/admin" element={<AddAdminPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/books" element={<Books />} />
            <Route path="/edit/book/:id" element={<EditBooks />} />
            <Route path="/users" element={<Users />} />
            <Route path="/edit/user/:id" element={<EditUser />} />
            <Route path="/add/book" element={<AddBook />} />
            <Route path="/edit/data" element={<EditData />} />
            <Route path="/setting" element={<EditDataUser />} />
            <Route path="/send_email" element={<SendEmail/>} />
          </Routes>

          <Footer />
        </Router>
      </I18nextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
