import "./Auth.css";
import { Link } from "react-router-dom";

function Auth() {
  return (
    <div className="auth">
      <Link className="auth__link-btn" to="/signup">
        Регистрация
      </Link>
      <Link className="auth__link-btn" type="button" to="/signin">
        Войти
      </Link>
    </div>
  );
}

export default Auth;
