import React from "react";

import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form
        className="profile__form"
        id="profile__form"
      /*onSubmit={onSubmit}*/
      >
        <label className="profile__label">
          Имя
          <input
            className="profile__input"
            id="name"
            name="name"
            type="text"
            placeholder="Имя"
            minLength="2"
            maxLength="30"
            required
          />
        </label>
        <span id="name-error" className="profile__input-error">
          Что-то пошло не так...
        </span>
        <label className="profile__label">
          E&#8209;mail
          <input
            className="profile__input profile__input-email"
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            required
          />
        </label>
        <span id="email-error" className="profile__input-error">
          Что-то пошло не так...
        </span>
      </form>
      <button className="profile__edit-btn" type="submit" form="profile__form">
        Редактировать
      </button>
      <button className="profile__logout-btn">Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
