import React from "react";
/*import strelka from '../../images/strelka.jpg';*/
import { Link } from "react-router-dom";

import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__box">
        <li>
          <Link
            className="portfolio__link-item"
            to="https://github.com/alolelyc/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-title">Статичный сайт</p>
            <p className="portfolio__link-strelka">↗</p>
          </Link>
        </li>

        <li>
          <Link
            className="portfolio__link-item"
            to="https://github.com/alolelyc/russian-travell"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-title">Адаптивный сайт</p>
            <p className="portfolio__link-strelka">↗</p>
          </Link>
        </li>

        <li>
          <Link
            className="portfolio__link-item"
            to="https://github.com/alolelyc/mesto"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-title">Одностраничное приложение</p>
            <p className="portfolio__link-strelka">↗</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
