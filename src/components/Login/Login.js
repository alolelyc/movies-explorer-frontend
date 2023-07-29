import React from "react";

import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

const Login = ({ onSubmit, isFormValid }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" /*onSubmit={handleSubmit}*/>
          <label className="login__input-label">E-mail</label>
          <input
            className="login__input"
            placeholder="Email"
            name="email"
            type="email"
            /*minLength="2"
          maxLength="30"
          value={email}
          onChange={handleEmailClick}
          required*/
          />

          <label className="login__input-label">Пароль</label>
          <input
            className="login__input"
            placeholder="Пароль"
            name="password"
            type="password"
            /*minLength="2"
            maxLength="30"
            value={password}*/
            autoComplete="on"
            /*onChange={handlePasswordClick}
          required*/
          />

          <button
            className="login__button"
            onClick={handleSubmit} /*type="submit" disabled={!isValid}*/
          >
            Войти
          </button>
        </form>

        <div className="login__box">
          <p className="login__title-end">Еще не зарегистрированы? </p>
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>{" "}
        </div>
      </div>
    </section>
  );
};

export default Login;
