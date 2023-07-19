import React from "react";
import { useState, useEffect } from 'react';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
/*import SignOut from '../SignOut/SignOut';*/
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import NotFound from '../NotFound/NotFound';

const App = () => {
  const { pathname } = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  /*const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});*/
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/movies', { replace: true })
  }

  /*function onLogin() {

  }

  function onRegister() {
   }*/
  function openBurgerMenu() {
    setIsOpen(true);
  }
  function closeBurgerMenu() {
    setIsOpen(false);
  }
  return (
    <CurrentUserContext.Provider /*value={currentUser}*/>
      <div className="page">
        {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') &&
          <Header isLoggedIn={isLoggedIn} openBurgerMenu={openBurgerMenu} />
        }
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register isLoggedIn={isLoggedIn} />} />
          <Route path="/signin" element={<Login isLoggedIn={isLoggedIn} onSubmit={handleLogin} />} />
          <Route path="/movies" element={<Movies isLoggedIn={isLoggedIn} />} />
          <Route path="/saved-movies" element={<SavedMovies isLoggedIn={isLoggedIn} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound isLoggedIn={isLoggedIn} />} />
        </Routes>
        {(pathname === '/movies' || pathname === '/saved-movies' || pathname === '/') && <Footer />}
        <BurgerMenu isOpen={isOpen} onClose={closeBurgerMenu} />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;