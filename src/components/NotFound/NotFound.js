import React from "react";
import { useNavigate } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <div className="not-found__box">
        <h1 className="not-found__error">404</h1>
        <p className="not-found__message">Страница не найдена</p>
        <button className="not-found__button" onClick={() => navigate(-1)}>
          Назад
        </button>
      </div>
    </section>
  );
}

export default NotFound;
