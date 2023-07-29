import React from "react";
import { Link } from "react-router-dom";

import "./MoviesCard.css";

function MoviesCard({ card }) {
  const duration = (dur) => {
    if (dur < 60) return `${dur}м`;
    if (dur >= 60) {
      const hours = Math.floor(dur / 60);
      const minutes = dur % 60;
      return `${hours}ч ${minutes}м`;
    }
    return false;
  };

  return (
    <li className="movies-card">
      <img className="movies-card__img" src={card.image} alt={card.nameRU} />
      <div className="movies-card__box">
        <Link className="movies-card__link" to={card.trailerLink}>
          {card.nameRU}
        </Link>
        <div className="movies-card__like-box">
          <button
            type="button"
            className="movies-card__like-button"
            name="btnlike"
          ></button>
        </div>
      </div>
      <p className="movies-card__duration">{duration(card.duration)}</p>
    </li>
  );
}

export default MoviesCard;
