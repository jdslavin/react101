import { createSelector } from 'reselect';
import { toJS, List } from 'immutable';

const movies = (state) => state.get('movies');

export const makeSelectSearchString = () => createSelector(
  movies,
  (state) => state.get('searchString')
);

export const makeSelectMovies = () => createSelector(
  movies,
  (state) => {
    const movieList = new List(state.get('moviesDB').values()).toJS();
    return movieList;
  }
);

