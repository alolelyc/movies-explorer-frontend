import React from "react";

import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__box">
        <li>
          <a className="portfolio__link-item"
            href="https://github.com/alolelyc/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-title">Статичный сайт</p>
            <p className="portfolio__link-strelka">↗</p>
          </a>
        </li>

        <li>
          <a
            className="portfolio__link-item"
            href="https://alolelyc.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-title">Адаптивный сайт</p>
            <p className="portfolio__link-strelka">↗</p>
          </a>
        </li>

        <li>
          <a
            className="portfolio__link-item"
            href="https://alolelyc.github.io/mesto/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-title">Одностраничное приложение</p>
            <p className="portfolio__link-strelka">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
