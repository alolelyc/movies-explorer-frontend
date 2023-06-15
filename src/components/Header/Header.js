import React from "react";
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from '../../images/logo.svg';
import './Header.css';

function Header({ lendingPage, isLoggedIn }) {
    return (
        <header className="header">
            <Link to='/'>
                <img
                    className='header__logo'
                    src={logo}
                    alt='логотип'

                />
            </Link>

            {!isLoggedIn && lendingPage
                ? (
                    <>
                        <NavLink className="header__link-btn" to="/signup"> Регистрация </NavLink>
                        <NavLink className="header__link-btn" to="/signin"> Войти </NavLink>
                    </>
                ) : <Navigation />}


        </header>
    );
}

export default Header;