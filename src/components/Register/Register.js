/*import { useState } from "react";*/
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

function Register() {
  /*const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailClick(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordClick(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }*/

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>

        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" /*onSubmit={handleSubmit}*/>
          <label className="register__input-label">Имя</label>
          <input
            className="register__input"
            placeholder="Имя"
            id="name"
            name="Имя"
            type="text"
            minLength="2"
            maxLength="30"
            /*value={name}
            onChange={handleEmailClick}*/
            required
          />

          <label className="register__input-label">E-mail</label>
          <input
            className="register__input"
            placeholder="Email"
            id="email"
            type="email"
            /*value={email}
            onChange={handleEmailClick}*/
            required
          />

          <label className="register__input-label">Пароль</label>
          <input
            className="register__input"
            placeholder="Пароль"
            type="password"
            id="password"
            /*value={password}
            autoComplete="on"
            onChange={handlePasswordClick}*/
            required
          />
          <span className="register__input-error">Что-то пошло не так...</span>
        </form>

        <button type="submit" className="register__btn">
          Зарегистрироваться
        </button>

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
