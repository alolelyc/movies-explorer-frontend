import React from "react";
import { useState, /*useEffect*/ } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import NotFound from "../NotFound/NotFound";
import { useEffect } from "react";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import NotifyPopup from "../NotifyPopup/NotifyPopup.js";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import filterMovies from "../../utils/filterMovies.js";

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = useLocation();
  const url = location.pathname;

  // стейт авторизован клиент или нет
  const [isUserAuthed, setIsUserAuthed] = useState(false);
  // стейт открыт бургер меню или нет
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
  // стейт загрузки идет или нет
  const [isLoading, setIsLoading] = useState(false);
  // стейт данных текущего пользователя
  const [currentUser, setСurrentUser] = useState({ email: '', name: '' });
  // стейт текста уведомления
  const [textNotification, setTextNotification] = useState('');
  // стейт открыта модалка или нет
  const [isOpenNotifyPopup, setIsOpenNotifyPopup] = useState(false);
  // стейт массива всех фильмов
  const [movies, setMovies] = useState([]);
  // стейт массива сохранненых фильмов
  const [saveMovies, setMoviesSaved] = useState([]);
  // стейт массива отфильтрованных сохранненых фильмов
  const [filteredSaveMovies, setFilteredSaveMovies] = useState([]);
  // стейт включен фильтр чекбокс для короткометражек для всех фильмов или нет
  const [isFilterShortsMovies, setIsFilterShortsMovies] = useState(
    localStorage.getItem("filterShortsMovies")
      ? localStorage.getItem("filterShortsMovies") === "true"
      : false);
  // стейт текстового запроса поиска для всех фильмов
  const [queryFilterMovies, setQueryFilterMovies] = useState(
    localStorage.getItem("query")
      ? localStorage.getItem("query")
      : "");
  // стейт включен фильтр чекбокс для короткометражек для сохраненных фильмов или нет
  const [isFilterShortsSaveMovies, sesFilterShortsSaveMovies] = useState(null);
  // стейт текстового запроса поиска для сохраненных фильмов
  const [queryFilterSaveMovies, setQueryFilterSaveMovies] = useState('');

  // открытие меню
  const openBurgerMenu = () => {
    setIsOpenBurgerMenu(true);
  }

  // закрытие меню
  const closeBurgerMenu = () => {
    setIsOpenBurgerMenu(false);
  }

  // ошибки приходят сюда
  const handlerErrors = (err) => {
    let text;
    err.message === 'Failed to fetch'
      ? text = 'Проблемы с интернетом'
      : text = err.message;
    setTextNotification(text);
    console.log(err);
  }

  // функция удаления данных пользователя с приложения
  const removeUserData = (notify = true) => {
    setIsUserAuthed(false);
    localStorage.clear();
    setСurrentUser({ email: '', name: '' });
    notify && setQueryFilterMovies('')
  }

  // проверка данных пользователя на сервере
  const checkUser = async () => {
    try {
      const data = await mainApi.onCheckUser();
      if (!data.error) {
        setIsUserAuthed(true);
        const { email, name } = data;
        setСurrentUser({ email, name });
        navigate(url);
      } else {
        removeUserData(false)
      }
    }
    catch (error) {
      handlerErrors(error);
    }
  };

  // функция создания пользователя - регистрация
  const handleCreateUser = async ({ email, password, name }) => {
    setIsLoading(true);
    mainApi.onRegister(email, password, name)
      .then((res) => {
        if (res.error) {
          throw new Error(res.error)
        }
        checkUser()
          .then(() => {
            navigate('/movies');
          })
          .catch(handlerErrors)
      })
      .catch(handlerErrors)
      .finally(() => setIsLoading(false))
  }

  // функция авторизации пользователя - вход
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    mainApi.onLogin(email, password)
      .then((res) => {
        if (res.error) {
          throw new Error(res.error)
        }
        checkUser()
          .then(() => {
            navigate('/movies');
          })
          .catch(handlerErrors)
      })
      .catch(handlerErrors)
      .finally(() => setIsLoading(false))
  }

  // функция выхода пользователя и удаления куков,а также всех данных
  const handleSignOut = async () => {
    setIsLoading(true);
    mainApi.onLogout()
      .then(() => {
        removeUserData()
        setTextNotification(`Вы вышли! История поиска очищена`);
        navigate('/');
      })
      .catch(handlerErrors)
      .finally(() => setIsLoading(false))
  }

  // функция изменения данных пользователя
  const handleEditUser = async ({ name, email }) => {
    setIsLoading(true);
    mainApi.onEditProfile({ name, email })
      .then((response) => {
        if (response.error) {
          removeUserData();
          throw new Error(response.error)
        }
        setTextNotification(`Новые имя и емейл сохранены!`);
        setСurrentUser(response);
      })
      .catch(handlerErrors)
      .finally(() => setIsLoading(false))

  }

  // функция получения списка всех фильмов
  const getMovies = async () => {
    // если запрос пустой, то и массив пустой
    if (!queryFilterMovies) {
      setMovies([]);
      return;
    }
    try {
      setIsLoading(true);
      const moviesInHistory = localStorage.getItem("movies");
      let moviesList;
      // если в локалсторедж есть сохраненный список фильмов с прошлого поиска, то воспользуемся им
      if (moviesInHistory === JSON.stringify(movies)) {
        moviesList = JSON.parse(moviesInHistory)
      } else {
        // а если нет, то загрузим с сервера
        moviesList = await moviesApi.getAllMovies();
      }
      // сохраним в локалсторедж
      localStorage.setItem("movies", JSON.stringify(moviesList));
      // сразу отфильтруем
      const filteredMovies = filterMovies(moviesList, queryFilterMovies, isFilterShortsMovies);
      // запишем в стейт отфильтрованные фильмы
      setMovies(filteredMovies);
    } catch (err) {
      handlerErrors(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSaveMovies = async () => {
    try {
      const saveMoviesInHistory = localStorage.getItem("saveMovies");
      let moviesList;
      // если в локалсторедж есть сохраненный список любимых фильмов с прошлого поиска, то воспользуемся им
      if (saveMoviesInHistory === JSON.stringify(moviesList)) {
        moviesList = JSON.parse(saveMoviesInHistory)
      } else {
        // а если нет, то загрузим с сервера
        moviesList = await mainApi.onGetSavedMovies();
      }
      // сохраним в локалсторедж
      localStorage.setItem("saveMovies", JSON.stringify(moviesList));
      setMoviesSaved(moviesList);
      // сразу отфильтруем
      const filteredSaveMovies = filterMovies(moviesList, queryFilterSaveMovies, isFilterShortsSaveMovies);
      setFilteredSaveMovies(filteredSaveMovies);
    } catch (err) {
      handlerErrors(err);
    } finally {
    }
  };

  // функция добавления фильма в избранное
  async function handleAddMovie (movie) {
    try {
      const newMovie = await mainApi.onAddMovie(movie);
      if (newMovie.error) {
        removeUserData();
        throw new Error(newMovie.error)
      }
      setMoviesSaved([...saveMovies, newMovie])
      localStorage.setItem("saveMovies", JSON.stringify([...saveMovies, newMovie]));
    } catch (err) {
      handlerErrors(err);
    }
  }

  // функция удаления фильма из списка сохраненных
  async function handleRemoveSavedMovie (movieId) {
    const findedMovie = saveMovies.find(card => card.movieId === movieId);
    try {
      const removedMovie = await mainApi.onRemoveMovie(findedMovie._id);
      if (removedMovie.error) {
        removeUserData();
        throw new Error(removedMovie.error)
      }
      const newArraySaveMovieList = saveMovies.filter((card) => card._id !== removedMovie._id);
      setMoviesSaved(newArraySaveMovieList)
      localStorage.setItem("saveMovies", JSON.stringify(newArraySaveMovieList));
    } catch (err) {
      handlerErrors(err);
    }
  }

  //при первой загрузке, если клиент не авторизован проверяем его данные на сервере
  useEffect(() => {
    if (!isUserAuthed) {
      try {
        setIsLoading(true);
        checkUser();
      } catch (error) {
        handlerErrors(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  // если мы добавили текст в уведомления, то открываем модалку
  useEffect(() => {
    if (textNotification) setIsOpenNotifyPopup(true)
  }, [textNotification]);

  // если закрыли модалку сами, то подтираем текст уведомления
  useEffect(() => {
    if (!isOpenNotifyPopup) setTextNotification('')
  }, [isOpenNotifyPopup]);

  // возвращаем на страницу, куда было обращение
  useEffect(() => {
    if (isUserAuthed) {
      navigate(url);
    }
  }, [isUserAuthed])

  // если изменили текст запроса или фильтр чекбокса то обновляем список
  useEffect(() => {
    if (isUserAuthed) {
      getMovies();
      if (queryFilterMovies) { localStorage.setItem("query", queryFilterMovies) };
      localStorage.setItem("filterShortsMovies", isFilterShortsMovies);
    }
  }, [isFilterShortsMovies, queryFilterMovies]);

  useEffect(() => {
    if (isUserAuthed) {
      getSaveMovies();
    }
  }, [isFilterShortsSaveMovies, queryFilterSaveMovies]);

  // если авторизация успешная, загружаем список фильмов
  useEffect(() => {
    if (isUserAuthed) {
      getMovies();
      getSaveMovies();
    }
  }, [isUserAuthed]);

  // если был включен фильтр по сохраненным фильмам и мы сделали изменения в список (добавление/удаление), то вернем настройки фильтра
  useEffect(() => {
    const filteredSaveMovies = filterMovies(saveMovies, queryFilterSaveMovies, isFilterShortsSaveMovies);
    setFilteredSaveMovies(filteredSaveMovies);
  }, [saveMovies]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {(pathname === "/" ||
          pathname === "/movies" ||
          pathname === "/saved-movies" ||
          pathname === "/profile") && (
            <Header isUserAuthed={isUserAuthed} openBurgerMenu={openBurgerMenu} />
          )}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signup"
            element={<Register
              isUserAuthed={isUserAuthed}
              onSubmit={handleCreateUser}
            />}
          />
          <Route
            path="/signin"
            element={<Login
              isUserAuthed={isUserAuthed}
              onSubmit={handleLogin} />}
          />
          <Route path="/movies" element={
            <ProtectedRoute
              element={Movies}
              isUserAuthed={isUserAuthed}
              setIsChecked={setIsFilterShortsMovies}
              setSearchText={setQueryFilterMovies}
              movies={movies}
              saveMovies={saveMovies}
              isLoading={isLoading}
              onAddMovie={handleAddMovie}
              onRemoveMovie={handleRemoveSavedMovie}
            />
          } />

          <Route path="/saved-movies" element={
            <ProtectedRoute
              element={SavedMovies}
              isUserAuthed={isUserAuthed}
              movies={filteredSaveMovies}
              setSearchText={setQueryFilterSaveMovies}
              setIsChecked={sesFilterShortsSaveMovies}
              saveMovies={saveMovies}
              isLoading={isLoading}
              onRemoveMovie={handleRemoveSavedMovie}
            />
          } />
          <Route path="/profile" element={
            <ProtectedRoute
              element={Profile}
              isUserAuthed={isUserAuthed}
              onEditProfile={handleEditUser}
              isLoading={isLoading}
              onSignOut={handleSignOut}
            />
          } />
          <Route path="*"
            element={<NotFound />} />
        </Routes>
        <NotifyPopup
          isOpen={isOpenNotifyPopup}
          setPopupOpened={setIsOpenNotifyPopup}
          textNotify={textNotification} />
        {(pathname === "/movies" ||
          pathname === "/saved-movies" ||
          pathname === "/") && <Footer />}
        <BurgerMenu
          isOpenBurgerMenu={isOpenBurgerMenu}
          onClose={closeBurgerMenu} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
