import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="aboutProject">
      <div className="aboutProject_container">
        <h2 id="about-project" className="aboutProject__title">
          О проекте
        </h2>
        <ul className="aboutProject__box">
          <li className="aboutProject__description">
            <h3 className="aboutProject__info_1">
              Дипломный проект включал 5 этапов
            </h3>

            <p className="aboutProject__info_2">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="aboutProject__description">
            <h3 className="aboutProject__info_1">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="aboutProject__info_2">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className="aboutProject__period">
          <li className="aboutProject__period_description">
            <h4 className="aboutProject__period_time">1 неделя</h4>
            <p className="aboutProject__period_text">Back-end</p>
          </li>
          <li className="aboutProject__period_description">
            <p className="aboutProject__period_time">4 недели</p>
            <p className="aboutProject__period_text">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;
