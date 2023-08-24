import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({ cards }) {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__box">
        <ul className="movies-card-list__cards">
          {cards.map((card) => {
            return <MoviesCard card={card} key={card.id} />;
          })}
        </ul>
        <div className="movies-card-list__else-box">
          <button className="movies-card-list__else">Ещё</button>
        </div>
      </div>
    </section>
  );
}

export default MoviesCardList;
