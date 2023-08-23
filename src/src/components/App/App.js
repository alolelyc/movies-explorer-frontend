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
import { DURATION_SHORTS_MOVIES } from "../../utils/constants";
import NotifyPopup from "../NotifyPopup/NotifyPopup.js";

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = useLocation();
  const url = location.pathname;

  const [isUserAuthed, setIsUserAuthed] = useState(false);
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setСurrentUser] = useState({ email: '', name: '' });
  const [textNotification, setTextNotification] = useState('');
  const [isOpenNotifyPopup, setIsOpenNotifyPopup] = useState(false);
  const [movies, setMovies] = useState([]);
  const [saveMovies, setMoviesSaved] = useState([]);
  const [filteredSaveMovies, setFilteredSaveMovies] = useState([]);
  const [isFilterShortsMovies, setIsFilterShortsMovies] = useState(
    localStorage.getItem("filterShortsMovies")
      ? localStorage.getItem("filterShortsMovies") === "true"
      : false);
  const [queryFilterMovies, setQueryFilterMovies] = useState(
    localStorage.getItem("query")
      ? localStorage.getItem("query")
      : "");
  const [isFilterShortsSaveMovies, sesFilterShortsSaveMovies] = useState(null);
  const [queryFilterSaveMovies, setQueryFilterSaveMovies] = useState('');


  function openBurgerMenu () {
    setIsOpenBurgerMenu(true);
  }
  function closeBurgerMenu () {
    setIsOpenBurgerMenu(false);
  }
  function handlerErrors (err) {
    let text;
    err.message === 'Failed to fetch'
      ? text = 'Проблемы с интернетом'
      : text = err.message;
    setTextNotification(text);
    console.log(err);
  }

  const checkToken = async () => {
    try {
      const data = await mainApi.onCheckUser();
      if (!data.error) {
        setIsUserAuthed(true);
        const { email, name } = data;
        setСurrentUser({ email, name });
        navigate(url);
      }
    }
    catch (error) {
      handlerErrors(error);
    }
  };

  useEffect(() => {
    if (!isUserAuthed) {
      try {
        setIsLoading(true);
        checkToken();
      } catch (error) {
        handlerErrors(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  function handleLoginAndRegister (email, password, name, authFunction) {
    setIsLoading(true);
    authFunction(email, password, name)
      .then((res) => {
        if (res.error) {
          throw new Error(res.error)
        }
        checkToken()
          .then(() => {
            navigate('/movies');
          })
          .catch(handlerErrors)
      })
      .catch(handlerErrors)
      .finally(() => setIsLoading(false))
  }

  function handleCreateUser ({ email, password, name }) {
    handleLoginAndRegister(email, password, name, mainApi.onRegister);
  }
  function handleLogin (email, password) {
    handleLoginAndRegister(email, password, null, mainApi.onLogin);
  }

  function handleSignOut () {
    setIsLoading(true);
    mainApi.onLogout()
      .then(() => {
        setQueryFilterMovies('')
        localStorage.clear();
        setIsUserAuthed(false);
        setTextNotification(`Вы вышли! История поиска очищена`);
        setСurrentUser({ email: '', name: '' });
        navigate('/');
      })
      .catch(handlerErrors)
      .finally(() => setIsLoading(false))
  }

  function handleChangeProfile ({ name, email }) {
    setIsLoading(true);
    mainApi.onEditProfile({ name, email })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error)
        }
        setTextNotification(`Новые имя и емейл сохранены!`);
        setСurrentUser(data);
      })
      .catch(handlerErrors)
      .finally(() => setIsLoading(false))

  }

  useEffect(() => {
    textNotification && setIsOpenNotifyPopup(true)
  }, [textNotification]);

  useEffect(() => {
    !isOpenNotifyPopup && setTextNotification('')
  }, [isOpenNotifyPopup]);

  useEffect(() => {
    if (isUserAuthed) {
      navigate(url);
    }
  }, [isUserAuthed])


  const filterMovies = (moviesList = [], searchText = '', isFilterShorts = false) => {
    const filterSearchMoviesList = moviesList.filter(
      (card) =>
        card.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(searchText.toLowerCase()) ||
        card.description.toLowerCase().includes(searchText.toLowerCase()));
    if (isFilterShorts) {
      return filterSearchMoviesList.filter((card) => card.duration <= DURATION_SHORTS_MOVIES);
    } else {
      return filterSearchMoviesList;
    }
  }

  const getMovies = async () => {
    if (!queryFilterMovies) {
      setMovies([]);
      return;
    }
    try {
      setIsLoading(true);
      const moviesInHistory = localStorage.getItem("movies");
      let moviesAll;
      if (moviesInHistory === JSON.stringify(movies)) {
        moviesAll = JSON.parse(moviesInHistory)
      } else {
        moviesAll = await moviesApi.getAllMovies();
      }
      localStorage.setItem("movies", JSON.stringify(moviesAll));

      const filteredMovies = filterMovies(moviesAll, queryFilterMovies, isFilterShortsMovies);
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
      let saveMovies;
      if (saveMoviesInHistory === JSON.stringify(saveMovies)) {
        saveMovies = JSON.parse(saveMoviesInHistory)
      } else {
        saveMovies = await mainApi.onGetSavedMovies();
      }
      localStorage.setItem("saveMovies", JSON.stringify(saveMovies));
      setMoviesSaved(saveMovies);
      const filteredSaveMovies = filterMovies(saveMovies, queryFilterSaveMovies, isFilterShortsSaveMovies);
      setFilteredSaveMovies(filteredSaveMovies);
    } catch (err) {
      handlerErrors(err);
    } finally {
    }
  };

  async function handleAddMovie (movie) {
    try {
      const newMovie = await mainApi.onAddMovie(movie);
      setMoviesSaved([...saveMovies, newMovie])
      localStorage.setItem("saveMovies", JSON.stringify([...saveMovies, newMovie]));
    } catch (err) {
      handlerErrors(err);
    } finally {
    }
  }

  async function handleRemoveSavedMovie (movieId) {
    const findedMovie = saveMovies.find(card => card.movieId === movieId);
    try {
      const removedMovie = await mainApi.onRemoveMovie(findedMovie._id);
      const newArraySaveMovieList = saveMovies.filter((card) => card._id !== removedMovie._id);
      setMoviesSaved(newArraySaveMovieList)
      localStorage.setItem("saveMovies", JSON.stringify(newArraySaveMovieList));
    } catch (err) {
      handlerErrors(err);
    } finally {
    }
  }

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

  useEffect(() => {
    if (isUserAuthed) {
      getMovies();
      getSaveMovies();
    }
  }, [isUserAuthed]);

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
          <Route path="/movies"
            element={<Movies
              isUserAuthed={isUserAuthed}
              setIsChecked={setIsFilterShortsMovies}
              setSearchText={setQueryFilterMovies}
              movies={movies}
              saveMovies={saveMovies}
              isLoading={isLoading}
              onLike={handleAddMovie}
              onDislike={handleRemoveSavedMovie} />} />
          <Route
            path="/saved-movies"
            element={<SavedMovies
              isUserAuthed={isUserAuthed}
              movies={filteredSaveMovies}
              setSearchText={setQueryFilterSaveMovies}
              setIsChecked={sesFilterShortsSaveMovies}
              saveMovies={saveMovies}
              isLoading={isLoading}
              onDislike={handleRemoveSavedMovie}
            />}
          />
          <Route path="/profile"
            element={<Profile
              onEditProfile={handleChangeProfile}
              isLoading={isLoading}
              onSignOut={handleSignOut} />} />
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
