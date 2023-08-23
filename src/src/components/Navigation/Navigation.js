import React from "react";
import { Link, NavLink } from "react-router-dom";
/*import BurgerMenu from '../BurgerMenu/BurgerMenu';*/
import "./Navigation.css";

const Navigation = ({ openBurgerMenu }) => {
  /*const screenWidth = useResize().width;*/

  return (
    <nav className="navigation">
      <>
        <ul className="navigation__box">
          <li className="navigation__films">
            <NavLink className={({ isActive }) => `navigation__films-link_films ${isActive ? 'navigation__films-link_type_active' : ''}`} to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__films">
            <NavLink
              className={({ isActive }) => `navigation__films-link_save-films ${isActive ? 'navigation__films-link_type_active' : ''}`}
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <div className="navigation__auth_account">
          <div className="navigation__profile">
            <Link className="navigation__link_account" to="/profile">
              Аккаунт
            </Link>
            <div className="navigation__icon-account"></div>
          </div>
        </div>
      </>

      <>
        <button
          className="navigation__burger-menu-btn"
          type="button"
          onClick={openBurgerMenu}
        />
      </>
    </nav>
  );
};

export default Navigation;
