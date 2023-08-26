/*import { useState } from "react";*/
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";
import useForm from "../../hooks/useForm";
import { useEffect } from "react";
import useTitle from "../../hooks/useTitle";
import { useNavigate } from "react-router-dom";

function Register ({ onSubmit, isUserAuthed, isLoading }) {
  useTitle('Регистрация'); // установка заголовка для страницы
  const navigate = useNavigate();

  const { values, errors, isFormValid, onChange } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  useEffect(() => {
    if (isUserAuthed) {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 0)
    }
  }, [isUserAuthed]);
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
            id="name"
            name="name"
            type="text"
            placeholder="Имя"
            className={`register__input ${errors.name && 'register__input_error'}`}
            minLength="2"
            maxLength="30"
            value={values.name}
            onChange={onChange}
            disabled={isLoading}
            required
          />
          {errors.name && (<span
            className="register__error">{errors.name}</span>)}
          <label className="register__input-label">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className={`register__input ${errors.email && 'register__input_error'}`}
            value={values.email}
            onChange={onChange}
            disabled={isLoading}
            required
          />
          {errors.email && (<span
            className="register__error">{errors.email}</span>)}
          <label className="register__input-label">Пароль</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            className={`register__input ${errors.password && 'register__input_error'}`}
            value={values.password}
            autoComplete="on"
            onChange={onChange}
            minLength="2"
            maxLength="30"
            disabled={isLoading}
            required
          />
          {errors.password && (<span
            className="register__error">{errors.password}</span>)}
          <button
            type="submit"
            className="register__btn"
            disabled={!isFormValid || isLoading}
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
