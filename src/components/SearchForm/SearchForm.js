import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onSubmit }) {
  return (
    <form
      className="search-form"
      id="search-form"
      onSubmit={onSubmit}
    >
      <fieldset className="search-form__film">
        <label className="search-form__icon" />
        <input
          className="search-form__input"
          id="movie"
          type="text"
          name="movie"
          placeholder="Фильм"
          required
        />
        <input
          className="search-form__submit"
          type="submit"
          form="search-form"
          value=" "
        />
      </fieldset>
      <FilterCheckbox />
    </form>

  )
}

export default SearchForm;