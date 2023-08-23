import { ALL_MOVIES_SERVER_URL } from './constants';

class MoviesApi {
  constructor(options) {
    this._url = options.url;
  }

  _handleResponse (res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json()
  }

  getAllMovies () {
    return fetch(this._url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => this._handleResponse(res));
  }
}

const moviesApi = new MoviesApi({
  url: ALL_MOVIES_SERVER_URL,
});

export default moviesApi;
