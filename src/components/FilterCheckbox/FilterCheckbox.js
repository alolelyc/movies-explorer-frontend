import React from 'react';

import './FilterCheckbox.css'

function FilterCheckbox({ onSubmit }) {
  return (
    <div className="filter-checkbox__toggle">
    <label className="filter-checkbox__container">
      <input
        className="filter-checkbox__icon"
        type="checkbox"
        id="checkbox"
        form="search-form"
      />
      <span className="filter-checkbox__slider" />
      </label>
      <p className="filter-checkbox__shortfilms">Короткометражки</p>


    </div>
  )
}

export default FilterCheckbox;