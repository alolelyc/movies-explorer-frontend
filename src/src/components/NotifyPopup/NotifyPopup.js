import { useEffect } from 'react';
import './NotifyPopup.css';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.svg";

const NotifyPopup = ({
  isOpen,
  setPopupOpened,
  textNotify
}) => {

  function handleClickClosePopup () {
    setPopupOpened(false)
  }

  return (
    <section
      className={`popup-notify popup-notify_type_notify ${isOpen && 'popup-notify_opened'}`}
    >
      <div className={`popup-notify__container popup-notify__container_notify`}>
        <button
          type="button"
          className="popup-notify__close"
          onClick={handleClickClosePopup}
        />
        <div className='popup-notify__header'><Link to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
          <h2 className="popup-notify__header-title">Уведомление</h2></div>
        <h3 className="popup-notify__notify-title">{textNotify}</h3>
        <button type='button' className='popup-notify__btn' onClick={handleClickClosePopup}>ОК</button>
      </div>
    </section>
  );
};
export default NotifyPopup;
