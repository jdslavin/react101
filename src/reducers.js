import { combineReducers } from 'redux-immutable';
import { fromJS, Map } from 'immutable';
import { CHANGE_MOVIEDB, CHANGE_SEARCH_STRING } from "./actions";
import { reduce } from 'lodash/collection'

const initialState = fromJS({
  searchString: '',
  moviesDB: {},
});

const buildMovieMap = (movies) => reduce(movies, (result, movie) => result.set(movie.id, fromJS(movie)), new Map());

function movies(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_STRING:
      return state
        .set("searchString", action.searchString);
    case CHANGE_MOVIEDB:
      return state
        .set("moviesDB", buildMovieMap(action.movies.results));
    default:
      return state
  }
}

export const moviesApp = combineReducers({
  movies
});