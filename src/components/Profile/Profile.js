import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import "./Profile.css";
import useForm from "../../hooks/useForm.js";
import useTitle from "../../hooks/useTitle.js";

function Profile (props) {
  useTitle('Данные пользователя'); // установка заголовка для страницы
  const { values, errors, isFormValid, onChange, resetValidation } = useForm();
  const currentUser = useContext(CurrentUserContext);
  const [isCurrentUser, setUserDifference] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      setUserDifference(true);
    } else {
      setUserDifference(false);
    }
  }, [values.name, values.email, currentUser.name, currentUser.email]);

  useEffect(() => {
    resetValidation({ name: currentUser.name, email: currentUser.email }, {}, false);
  }, [currentUser, resetValidation]);

  function handleEditClick () {
    setIsEdit(true);
  }
  function handleSubmit (e) {
    e.preventDefault();
    props.onEditProfile(values);
  }

  function handleClickBtnCancel () {
    setIsEdit(false)
    resetValidation({ name: currentUser.name, email: currentUser.email }, {}, false);
  }
  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${currentUser?.name || ''}!`}</h1>
      <form
        className="profile__form"
        id="profile__form"
        onSubmit={handleSubmit}
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
            disabled={isEdit && !props.isLoading ? false : true}
            onChange={onChange}
            value={values.name || ""}
          />
        </label>
        {errors.name && (<span id="name-error" className="profile__input-error">{errors.name}</span>)}
        <label className="profile__label">
          E&#8209;mail
          <input
            className="profile__input profile__input-email profile__input_type_error"
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            required
            disabled={isEdit && !props.isLoading ? false : true}
            onChange={onChange}
            value={values.email || ""}
          />
        </label>
        {errors.email && (<span id="email-error" className="profile__input-error">{errors.email}</span>)}
        {isEdit ? (
          <>
            <button
              type="submit"
              disabled={props.isLoading || !isFormValid || !isCurrentUser}
              className={`profile__submit `}
            >
              Сохранить
            </button>
            <button
              type="button"
              className={`profile__submit `}
              onClick={handleClickBtnCancel}
            >
              Отмена
            </button>
          </>
        ) : ""}
      </form>
      {!isEdit ? (
        <>
          <button
            className="profile__edit-btn"
            type="button"
            onClick={handleEditClick}>
            Редактировать
          </button>
          <button type="button" className="profile__logout-btn" onClick={props.onSignOut}>Выйти из аккаунта</button>
        </>
      ) : ''}
    </section>
  );
}

export default Profile;
