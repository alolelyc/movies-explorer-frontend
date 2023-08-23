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
    onDislike } = props;

  useEffect(() => {
    setIsChecked(false);
    setSearchText("");
  }, [])

  return (
    <section className="saved-movies">
      <SearchForm
        isLoading={isLoading}
        isSaveInLS={false}
        setSearchText={setSearchText}
        setIsChecked={setIsChecked}
      />
      <MoviesCardList
        saveMovies={saveMovies}
        isLoading={isLoading}
        onDislike={onDislike}
        movies={movies}
      />
    </section>
  );
}

export default SavedMovies;
