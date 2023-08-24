import { BASE_URL } from './constants';

class MainApi {
  constructor(options) {
    this._options = options;
    this._server = this._options.server;
    this.onLogin = this.onLogin.bind(this)
    this.onRegister = this.onRegister.bind(this)
    this.onCheckUser = this.onCheckUser.bind(this)
    this.onGetUserInfo = this.onGetUserInfo.bind(this)
    this.onEditProfile = this.onEditProfile.bind(this)
    this.onGetSavedMovies = this.onGetSavedMovies.bind(this)
    this.onAddMovie = this.onAddMovie.bind(this)
    this.onRemoveMovie = this.onRemoveMovie.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  _headers () {
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

  async onCheckUser () {
    const res = await fetch(`${this._server}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers(),
    });
    return this._handleErrorAndResponse(res);
  };

  async onRegister (email, password, name) {
    const res = await fetch(`${this._server}/signup`, {
      method: 'POST',
      credentials: "include",
      headers: this._headers(),
      body: JSON.stringify({ email, password, name })
    });
    return this._handleErrorAndResponse(res);
  };

  async onLogin ({ email, password }) {
    const res = await fetch(`${this._server}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ email, password })
    });
    return this._handleErrorAndResponse(res);
  };


  async onGetUserInfo () {
    const res = await fetch(`${this._server}/users/me`, {
      method: 'GET',
      headers: this._headers(),
      credentials: 'include',
    });
    return this._handleErrorAndResponse(res);
  }

  async onEditProfile ({ name, email }) {
    const res = await fetch(`${this._server}/users/me`, {
      method: 'PATCH',
      headers: this._headers(),
      credentials: 'include',
      body: JSON.stringify({ name, email }),
    });
    return this._handleErrorAndResponse(res);
  }

  async onGetSavedMovies () {
    const res = await fetch(`${this._server}/movies`, {
      method: 'GET',
      headers: this._headers(),
      credentials: 'include',
    });
    return this._handleErrorAndResponse(res);
  }

  async onAddMovie (movie) {
    const { movieId, nameRU, nameEN, country, director, duration, year, description, image, trailerLink, thumbnail } = movie;
    const res = await fetch(`${this._server}/movies`, {
      method: 'POST',
      headers: this._headers(),
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
    });
    return this._handleErrorAndResponse(res);
  }

  async onRemoveMovie (id) {
    const res = await fetch(`${this._server}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers(),
      credentials: 'include',
    });
    return this._handleErrorAndResponse(res);
  }

  async onLogout () {
    const res = await fetch(`${this._server}/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers(),
    });
    return this._handleErrorAndResponse(res);
  }
};

const mainApi = new MainApi({
  server: BASE_URL,
});

export default mainApi;
