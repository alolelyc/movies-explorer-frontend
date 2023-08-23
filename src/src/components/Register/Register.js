/*import { useState } from "react";*/
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";
import useForm from "../../hooks/useForm";
import { useEffect } from "react";
import useTitle from "../../hooks/useTitle";

function Register ({ onSubmit, isUserAuthed }) {
  useTitle('Регистрация'); // установка заголовка для страницы

  const { values, errors, isFormValid, onChange } = useForm();

  useEffect(() => {
    console.log(isFormValid);
  }, [isFormValid])

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>

        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__input-label">Имя</label>
          <input
            className={`register__input ${errors.name && 'register__input_error'}`}
            placeholder="Имя"
            id="name"
            name="name"
            type="text"
            minLength="2"
            maxLength="30"
            value={values.name}
            onChange={onChange}
            required
          />
          {errors.name && (<span
            className="register__error">{errors.name}</span>)}
          <label className="register__input-label">E-mail</label>
          <input
            className={`register__input ${errors.email && 'register__input_error'}`}
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            required
          />
          {errors.email && (<span
            className="register__error">{errors.email}</span>)}
          <label className="register__input-label">Пароль</label>
          <input
            className={`register__input ${errors.password && 'register__input_error'}`}
            placeholder="Пароль"
            type="password"
            name="password"
            id="password"
            value={values.password}
            autoComplete="on"
            onChange={onChange}
            required
            minLength="2"
            maxLength="30"
          />
          {errors.password && (<span
            className="register__error">{errors.password}</span>)}
          <button
            type="submit"
            className="register__btn"
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </button>
        </form>

        <p className="register__title-end">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="register__link">
            Войти
          </Link>{" "}
        </p>
      </div>
    </section>
  );
}

export default Register;
