import { createSelector } from 'reselect';
import { toJS, List } from 'immutable';
import { orderBy } from 'lodash/collection';

const movies = (state) => state.get('movies');

export const makeSelectSearchString = () => createSelector(
  movies,
  (state) => state.get('searchString')
);

export const makeSelectMovies = () => createSelector(
  movies,
  (state) => {
    const movieList = new List(state.get('moviesDB').values()).toJS();
    return orderBy(movieList, 'title');
  }
);

