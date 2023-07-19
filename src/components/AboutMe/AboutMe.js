import React from "react";
import "./AboutMe.css";
import Portfolio from '../Portfolio/Portfolio';
import myfoto from "../../images/myfoto.jpg";

function AboutMe() {
  return (
    <section className="aboutMe">
      <div className="aboutMe__container">
        <h2 className="aboutMe__title">Студент</h2>
        <div className="aboutMe__box">
          <div className="aboutMe__box-info">
            <h3 className="aboutMe__name">Ольга</h3>
            <p className="aboutMe__info">Фронтенд-разработчик, 39 лет</p>
            <p className="aboutMe__description">
              Родилась и&nbsp;выросла в&nbsp;Ленинградской области. Закончила РГГУ, факультет Менеджмент организации. Работаю в&nbsp;сфере закупок. На&nbsp;Вэб-разработчика пришла учиться с&nbsp;нуля.
            </p>
            <a className="aboutMe__link"
              href="https://github.com/alolelyc"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <img className="aboutMe__photo" src={myfoto} alt="мое фото"></img>
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;