import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { CHANGE_SEARCH_STRING } from "./actions";

const initialState = fromJS({
  searchString: '',
  moviesDB: {},
});

function movies(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_STRING:
      return state
        .set("searchString", action.searchString);
    default:
      return state
  }
}

export const moviesApp = combineReducers({
  movies
});