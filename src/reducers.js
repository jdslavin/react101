import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

const initialState = fromJS({
  searchString: '',
  moviesDB: {},
});

function movies(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export const moviesApp = combineReducers({
  movies
});