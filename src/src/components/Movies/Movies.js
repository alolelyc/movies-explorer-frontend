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
    onLike,
    onDislike } = props;

  const [viewMovies, setViewMovies] = useState([]);
  const nonViewedMovies = movies.slice(viewMovies.length);
  const [qtyNewCardsInLine, setQtyNewCardsInLine] = useState(null);
  const [cardsInFirstLoad, setCountCardsPerLoad] = useState(calcQuantityCards().cardsInFirstLoad);
  useTitle('Фильмы'); // установка заголовка для страницы
  useEffect(() => {
    setViewMovies(movies.slice(0, cardsInFirstLoad))
  }, [movies])

  useEffect(() => {
    const { cardsInFirstLoad, qtyNewCardsInLine } = calcQuantityCards();
    setCountCardsPerLoad(cardsInFirstLoad);
    setQtyNewCardsInLine(qtyNewCardsInLine);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onClickMore () {
    setViewMovies([...viewMovies, ...nonViewedMovies.slice(0, qtyNewCardsInLine)])
  }

  function handleResize () {
    setTimeout(() => {
      const { cardsInFirstLoad, qtyNewCardsInLine } = calcQuantityCards();
      setCountCardsPerLoad(cardsInFirstLoad);
      setQtyNewCardsInLine(qtyNewCardsInLine);
    }, 1000);
  }

  return (
    <section className="movies">
      <SearchForm isLoading={isLoading}
        setIsChecked={setIsChecked}
        setSearchText={setSearchText}
        isSaveInLS={true}
      />
      <MoviesCardList
        movies={viewMovies}
        isLoading={isLoading}
        nonViewedMovies={nonViewedMovies}
        onClickMore={onClickMore}
        saveMovies={saveMovies}
        onLike={onLike}
        onDislike={onDislike}
      />
    </section>
  );
}

export default Movies;
