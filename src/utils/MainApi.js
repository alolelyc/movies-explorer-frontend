import { BASE_URL } from './constants';

class MainApi {
  constructor(options) {
    this._options = options;
    this._server = this._options.server;

    //возвращаем контекст
    this.onLogin = this._handleLogin.bind(this)
    this.onRegister = this._handleCreateUser.bind(this)
    this.onCheckUser = this._handleCheckUser.bind(this)
    this.onGetUserInfo = this._handleUserInfo.bind(this)
    this.onEditProfile = this._handleEditProfileData.bind(this)
    this.onGetSavedMovies = this._handleGetMovies.bind(this)
    this.onAddMovie = this._handleCreateMovie.bind(this)
    this.onRemoveMovie = this._handleDeleteMovie.bind(this)
    this.onLogout = this._handleExit.bind(this)
  }

  _getHeaders () {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  _handleErrorAndResponse (res) {
    return res.status === 200
      || res.status === 201
      ? res.json()
      : res.status === 400 ||
        res.status === 401 ||
        res.status === 403 ||
        res.status === 404 ||
        res.status === 409 ?
        res.json().then((jsonError) => ({ error: jsonError.message })) :
        res.status === 500 ?
          { error: "Ошибка на стороне сервера" } :
          Promise.reject(`Ошибка: ${res.status}`);
  }

  _handleCheckUser () {
    return fetch(`${this._server}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._getHeaders(),
    }).then(this._handleErrorAndResponse);
  };

  _handleCreateUser (email, password, name) {
    return fetch(`${this._server}/signup`, {
      method: 'POST',
      credentials: "include",
      headers: this._getHeaders(),
      body: JSON.stringify({ email, password, name })
    }).then(this._handleErrorAndResponse);
  };

  _handleLogin ({ email, password }) {
    return fetch(`${this._server}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ email, password })
    }).then(this._handleErrorAndResponse);
  };


  _handleUserInfo () {
    return fetch(`${this._server}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
      credentials: 'include',
    })
      .then(this._handleErrorAndResponse);
  }

  _handleEditProfileData ({ name, email }) {
    return fetch(`${this._server}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ name, email }),
    })
      .then(this._handleErrorAndResponse);
  }

  _handleGetMovies () {
    return fetch(`${this._server}/movies`, {
      method: 'GET',
      headers: this._getHeaders(),
      credentials: 'include',
    })
      .then(this._handleErrorAndResponse);
  }

  _handleCreateMovie (movie) {
    const { movieId, nameRU, nameEN, country, director, duration, year, description, image, trailerLink, thumbnail } = movie;
    return fetch(`${this._server}/movies`, {
      method: 'POST',
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        image,
        movieId,
        thumbnail,
        country,
        director,
        duration,
        year,
        description,
        trailerLink,
        nameRU,
        nameEN,
      }),
    })
      .then(this._handleErrorAndResponse);
  }

  _handleDeleteMovie (id) {
    return fetch(`${this._server}/movies/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
      credentials: 'include',
    })
      .then(this._handleErrorAndResponse);
  }

  _handleExit () {
    return fetch(`${this._server}/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: this._getHeaders(),
    })
      .then(this._handleErrorAndResponse);
  }
};

const mainApi = new MainApi({
  server: BASE_URL,
});

export default mainApi;
