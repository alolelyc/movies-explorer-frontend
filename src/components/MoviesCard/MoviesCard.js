import React from "react";
import { Link } from "react-router-dom";

import "./MoviesCard.css";
import { ALL_MOVIES_SERVER } from "../../utils/constants";

function MoviesCard (props) {
  const {
    card,
    isLiked,
    onAddMovie,
    onRemoveMovie
  } = props;

  const calcDurationMovie = (dur) => {
    if (dur < 60) return `${dur}м`;
    if (dur >= 60) {
      const hours = Math.floor(dur / 60);
      const minutes = dur % 60;
      return `${hours}ч ${minutes}м`;
    }
    return false;
  };
  const isPageSavedMovies = card.image.length ? true : false;
  const image = isPageSavedMovies ? card.image : `${ALL_MOVIES_SERVER}${card.image.url}`;
  const thumbnail = isPageSavedMovies ? card.thumbnail : `${ALL_MOVIES_SERVER}${card.image.formats.thumbnail.url}`
  const id = isPageSavedMovies ? card.movieId : card.id;

  function handleAddMovie () {
    onAddMovie({ ...card, image, thumbnail, movieId: id })
  }

  function handleClickRemoveMovie () {
    onRemoveMovie(id)
  }
  function handleClickTrailerLink () {
    window.open(card.trailerLink)
  }
  return (
    <li className="movies-card">
      <img className="movies-card__img" src={image} alt={card.nameRU} onClick={handleClickTrailerLink} />
      <div className="movies-card__box">
        <span className="movies-card__link" onClick={handleClickTrailerLink}>
          {card.nameRU}
        </span>
        <div className="movies-card__like-box">
          <button
            type="button"
            className={`movies-card__like-button ${isLiked && 'movies-card__like-button_active'} ${isPageSavedMovies && 'movies-card__like-button_remove'}`}
            name="btnlike"
            onClick={isLiked ? handleClickRemoveMovie : handleAddMovie}
          ></button>
        </div>
      </div>
      <p className="movies-card__duration">{calcDurationMovie(card.duration)}</p>
    </li>
  );
}

export default MoviesCard;
