import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useEffect } from "react";
import "./Movies.css";
import calcQuantityCards from "../../utils/calcQuantityCards.js";
import useTitle from "../../hooks/useTitle";

function Movies (props) {
  const { setIsChecked,
    setSearchText,
    movies,
    saveMovies,
    isLoading,
    onAddMovie,
    onRemoveMovie } = props;

  const [viewMovies, setViewMovies] = useState([]);
  const nonViewedMovies = movies.slice(viewMovies.length);
  const [qtyNewCardsInLine, setQtyNewCardsInLine] = useState(null);
  const [cardsInFirstLoad, setCountCardsPerLoad] = useState(calcQuantityCards().cardsInFirstLoad);
  useTitle('Фильмы'); // установка заголовка для страницы

  useEffect(() => {
    setViewMovies(movies.slice(0, cardsInFirstLoad))
  }, [movies])


  function addMoviesMore () {
    setViewMovies([...viewMovies, ...nonViewedMovies.slice(0, qtyNewCardsInLine)])
  }

  function handleResize () {
    setTimeout(() => {
      const { cardsInFirstLoad, qtyNewCardsInLine } = calcQuantityCards();
      setCountCardsPerLoad(cardsInFirstLoad);
      setQtyNewCardsInLine(qtyNewCardsInLine);
    }, 1000);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    const { cardsInFirstLoad, qtyNewCardsInLine } = calcQuantityCards();
    setCountCardsPerLoad(cardsInFirstLoad);
    setQtyNewCardsInLine(qtyNewCardsInLine);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="movies">
      <SearchForm isLoading={isLoading}
        setIsChecked={setIsChecked}
        setSearchText={setSearchText}
        isSaveInLS
      />
      <MoviesCardList
        movies={viewMovies}
        isLoading={isLoading}
        nonViewedMovies={nonViewedMovies}
        addMoviesMore={addMoviesMore}
        saveMovies={saveMovies}
        onAddMovie={onAddMovie}
        onRemoveMovie={onRemoveMovie}
      />
    </section>
  );
}

export default Movies;
