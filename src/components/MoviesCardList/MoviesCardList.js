import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";
import { useEffect } from "react";
import { useState } from "react";
import Preloader from "../Preloader/Preloader";

function MoviesCardList (props) {
  const {
    movies,
    isLoading,
    nonViewedMovies,
    addMoviesMore,
    saveMovies,
    onAddMovie,
    onRemoveMovie,
    searchText
  } = props;

  const [arrayIdentificators, setArrayIdentificators] = useState([]);

  useEffect(() => {
    let newArrayIdentificators = saveMovies.map((movie) => movie.movieId);
    newArrayIdentificators = Array.from(new Set(newArrayIdentificators));
    setArrayIdentificators(newArrayIdentificators)
  }, [saveMovies])

  function isSavedOrNot (card) {
    return arrayIdentificators.includes(card.id || card.movieId)
  }
  if (isLoading) return <Preloader />
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__box">
        {movies.length ? (
          <ul className="movies-card-list__cards">
            {movies.map((card) => {
              return <MoviesCard card={card}
                onAddMovie={onAddMovie}
                onRemoveMovie={onRemoveMovie}
                key={card.id || card.movieId}
                isLiked={isSavedOrNot(card)} />;
            })}
          </ul>
        ) : searchText && (<h3 className="movies__title">Ничего не найдено</h3>)}
        {nonViewedMovies?.length ?
          (<div className="movies-card-list__else-box">
            <button className="movies-card-list__else" onClick={addMoviesMore}>Ещё</button>
          </div>) : ""}
      </div>
    </section>
  );
}

export default MoviesCardList;
