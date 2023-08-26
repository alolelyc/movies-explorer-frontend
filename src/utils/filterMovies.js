import { DURATION_SHORTS_MOVIES } from "./constants";

const filterMovies = (moviesList = [], searchText = '', isFilterShorts = false) => {
  const filteredMoviesList = moviesList.map((card) => {
    const containsSearchText =
      card.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
      card.nameEN.toLowerCase().includes(searchText.toLowerCase());

    if (isFilterShorts && card.duration > DURATION_SHORTS_MOVIES) {
      return null;
    }

    return containsSearchText ? card : null;
  });

  return filteredMoviesList.filter((card) => card !== null);
};
export default filterMovies;
