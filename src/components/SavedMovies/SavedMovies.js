import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import { useEffect } from "react";
import useTitle from "../../hooks/useTitle";

function SavedMovies (props) {
  useTitle('Сохраненные фильмы'); // установка заголовка для страницы

  const { isUserAuthed,
    setIsChecked,
    setSearchText,
    movies,
    saveMovies,
    isLoading,
    onRemoveMovie } = props;

  useEffect(() => {
    setSearchText("");
    setIsChecked(false);
  }, [])

  return (
    <section className="saved-movies">
      <SearchForm
        isSaveInLS={false}
        setSearchText={setSearchText}
        setIsChecked={setIsChecked}
        isLoading={isLoading}
      />
      <MoviesCardList
        saveMovies={saveMovies}
        isLoading={isLoading}
        onRemoveMovie={onRemoveMovie}
        movies={movies}
      />
    </section>
  );
}

export default SavedMovies;
