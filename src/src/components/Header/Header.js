import React from "react";

import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";
import Auth from "../Auth/Auth";
import Navigation from "../Navigation/Navigation";

function Header ({ isUserAuthed, openBurgerMenu }) {
  const { pathname } = useLocation();

  return (
    <header
      className={`header ${pathname === "/" ? "header_background-color_blue" : ""
        }`}
    >
      <div className="header__box">
        <Link to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>

        {isUserAuthed ? (
          <Navigation isUserAuthed={isUserAuthed} openBurgerMenu={openBurgerMenu} />
        ) : (
          <Auth />
        )}
      </div>
    </header>
  );
}

export default Header;
