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
    searchText,
    movies,
    saveMovies,
    isLoading,
    onRemoveMovie,
    setError } = props;

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
        setError={setError}
      />
      <MoviesCardList
        saveMovies={saveMovies}
        isLoading={isLoading}
        onRemoveMovie={onRemoveMovie}
        movies={movies}
        searchText={searchText}
      />
    </section>
  );
}

export default SavedMovies;
