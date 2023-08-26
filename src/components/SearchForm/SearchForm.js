import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useState } from "react";

function SearchForm (props) {
  const {
    setIsChecked,
    setSearchText,
    isLoading,
    isSaveInLS,
    setError
  } = props;
  function defaultValue () {
    if (isSaveInLS) {
      return localStorage.getItem("query") || "";
    } else { return "" }
  }
  function handleSubmit (event) {
    event.preventDefault();
    const searchText = event.target.elements['movie'].value;
    searchText
      ? setSearchText(searchText)
      : setError('Нужно ввести ключевое слово')
  }
  return (
    <form className="search-form" id="search-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="search-form__film">
        <label className="search-form__icon" />
        <input
          className="search-form__input"
          id="movie"
          type="text"
          name="movie"
          placeholder="Фильм"
          required
          defaultValue={defaultValue()}
          noValidate
          disabled={isLoading}
        />
        <button
          className="search-form__submit"
          type="submit"
          form="search-form"
          disabled={isLoading}
        />
      </fieldset>
      <FilterCheckbox setIsChecked={setIsChecked}
        isSaveInLS={isSaveInLS}
      />
    </form>
  );
}

export default SearchForm;
