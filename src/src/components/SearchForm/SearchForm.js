import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { useState } from "react";

function SearchForm (props) {
  const {
    setIsChecked,
    setSearchText,
    isLoading,
    isSaveInLS
  } = props;
  function defaultValue () {
    if (isSaveInLS) {
      return localStorage.getItem("query") || "";
    } else { return "" }
  }
  function handleSubmit (event) {
    event.preventDefault();
    const searchText = event.target.elements['movie'].value;
    setSearchText(searchText);
  }
  return (
    <form className="search-form" id="search-form" onSubmit={handleSubmit}>
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