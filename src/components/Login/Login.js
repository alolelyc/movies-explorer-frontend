import React from "react";

import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import useForm from "../../hooks/useForm";
//import { useEffect } from "react";
import useTitle from "../../hooks/useTitle";

const Login = ({ onSubmit, isUserAuthed }) => {
  useTitle('Авторизация'); // установка заголовка для страницы

  const { values, errors, isFormValid, onChange } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__input-label">E-mail</label>
          <input
            className={`login__input ${errors.email && 'login__input_error'}`}
            placeholder="Email"
            name="email"
            type="email"
            minLength="2"
            maxLength="30"
            value={values.email}
            onChange={onChange}
            required
          />
          {errors.email && (<span
            className="login__error">{errors.email}</span>)}
          <label className="login__input-label">Пароль</label>
          <input
            className={`login__input ${errors.password && 'login__input_error'}`}
            placeholder="Пароль"
            name="password"
            type="password"
            minLength="2"
            maxLength="30"
            value={values.password}
            autoComplete="on"
            onChange={onChange}
            required
          />
          {errors.password && (<span
            className="login__error">{errors.password}</span>)}
          <button
            className="login__button"
            type="submit"
            disabled={!isFormValid}
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
