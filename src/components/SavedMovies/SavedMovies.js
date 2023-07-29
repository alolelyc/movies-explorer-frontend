import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import cards from "../../utils/constans";
import "./SavedMovies.css";

function SavedMovies(
  /*{
    onGetSavedMovies, isResponseError, textResponse, onMovieDelete,
  }*/
) {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList
        cards={cards}
      /*onMovieDelete={onMovieDelete}*/
      />
    </section>
  );
}

export default SavedMovies;
