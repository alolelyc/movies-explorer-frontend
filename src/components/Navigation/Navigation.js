import React from "react";
import { Link } from "react-router-dom";
/*import BurgerMenu from '../BurgerMenu/BurgerMenu';*/
import "./Navigation.css";

const Navigation = ({ openBurgerMenu }) => {
  /*const screenWidth = useResize().width;*/

  return (
    <nav className="navigation">
      <>
        <ul className="navigation__box">
          <li className="navigation__films">
            <Link className="navigation__films-link_films" to="/movies">
              Фильмы
            </Link>
          </li>
          <li className="navigation__films">
            <Link
              className="navigation__films-link_save-films"
              to="/saved-movies"
            >
              Сохранённые фильмы
            </Link>
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
