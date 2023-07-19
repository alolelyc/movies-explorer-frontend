import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";
import Auth from "../Auth/Auth";
import Navigation from "../Navigation/Navigation";

function Header({ isLoggedIn, openBurgerMenu }) {
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

        {isLoggedIn ? (
          <Navigation isLoggedIn={isLoggedIn} openBurgerMenu={openBurgerMenu} />
        ) : (
          <Auth />
        )}
      </div>
    </header>
  );
}

export default Header;
