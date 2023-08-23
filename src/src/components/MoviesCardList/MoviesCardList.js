import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";
import { useEffect } from "react";
import { useState } from "react";

function MoviesCardList (props) {
  const {
    movies,
    isLoading,
    nonViewedMovies,
    onClickMore,
    saveMovies,
    onLike,
    onDislike
  } = props;

  const [savedMoviesArrId, setSavedMoviesArrId] = useState([]);

  useEffect(() => {
    let ids = saveMovies.map((movie) => movie.movieId);
    ids = [...new Set(ids)]
    setSavedMoviesArrId(ids)
  }, [saveMovies])

  function checkIsSavedMovies (movie) {
    const id = movie.id ? movie.id : movie.movieId;
    return savedMoviesArrId.includes(id)
  }

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__box">
        {movies.length ? (
          <ul className="movies-card-list__cards">
            {movies.map((card) => {
              return <MoviesCard card={card}
                onLike={onLike}
                onDislike={onDislike}
                key={card.id || card.movieId}
                liked={checkIsSavedMovies(card)} />;
            })}
          </ul>
        ) : (<h3 className="movies__title">Ничего не найдено</h3>)}
        {nonViewedMovies?.length ?
          (<div className="movies-card-list__else-box">
            <button className="movies-card-list__else" onClick={onClickMore}>Ещё</button>
          </div>) : ""}
      </div>
    </section>
  );
}

export default MoviesCardList;
