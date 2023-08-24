import React from "react";

import "./FilterCheckbox.css";
import { useState } from "react";

function FilterCheckbox (props) {
  const { setIsChecked, isSaveInLS } = props;
  const isCheckedInLS = localStorage.getItem("filterShortsMovies");
  const [isCheckedCheckbox, setIsCheckedCheckbox] = useState(
    isSaveInLS
      ? isCheckedInLS === "true"
      : false);

  function handleChange (e) {
    setIsChecked(e.target.checked);
    setIsCheckedCheckbox(e.target.checked)
  }

  return (
    <div className="filter-checkbox__toggle">
      <label className="filter-checkbox__container">
        <input
          className="filter-checkbox__icon"
          type="checkbox"
          id="checkbox"
          form="search-form"
          checked={isCheckedCheckbox}
          onChange={handleChange}
        />
        <span className="filter-checkbox__slider" />
      </label>
      <p className="filter-checkbox__shortfilms">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
