import './Promo.css';
import promo_image from '../../images/promo_image.svg';

function Promo() {
  return (
    <section className="promo">
      <div className='promo__box'>
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__image"
          src={promo_image}
          alt="буквы ос"
        />
      </div>
    </section>

  )
}

export default Promo;