import React from "react";

import { NavLink, Link } from "react-router-dom";
import "./BurgerMenu.css";

const BurgerMenu = ({ isOpenBurgerMenu, onClose }) => {
  return (
    <div className={`burger-menu ${isOpenBurgerMenu ? "burger-menu_opened" : ""}`}>
      <div className="burger-menu__box">
        <button className="burger-menu__close-btn" onClick={onClose} />

        <div className="burger-menu__list">
          <NavLink
            to="/"
            className="burger-menu__link burger-menu__link_active"
            onClick={onClose}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="burger-menu__link burger-menu__link_active"
            onClick={onClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="burger-menu__link burger-menu__link_active"
            onClick={onClose}
          >
            Сохранённые фильмы
          </NavLink>

          <div className="burger-menu__account">
            <div className="burger-menu__profile">
              <Link
                to="/profile"
                className="burger-menu__button_account"
                onClick={onClose}
              >
                Аккаунт
              </Link>
              <div className="burger-menu__icon-account"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
