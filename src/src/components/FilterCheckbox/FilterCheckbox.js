import React from "react";

import "./FilterCheckbox.css";
import { useState } from "react";

function FilterCheckbox (props) {
  const { setIsChecked, isSaveInLS } = props;
  const isChecked = localStorage.getItem("filterShortsMovies");
  const [isToggleOn, setIsToggleOn] = useState(
    isSaveInLS
      ? isChecked === "true"
      : false);

  function handleChange (e) {
    setIsChecked(e.target.checked);
    setIsToggleOn(e.target.checked)
  }

  return (
    <div className="filter-checkbox__toggle">
      <label className="filter-checkbox__container">
        <input
          className="filter-checkbox__icon"
          type="checkbox"
          id="checkbox"
          form="search-form"
          checked={isToggleOn}
          onChange={handleChange}
        />
        <span className="filter-checkbox__slider" />
      </label>
      <p className="filter-checkbox__shortfilms">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
