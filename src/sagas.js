import { changeMovieDB, START_SEARCH } from "./actions";
import { takeEvery, call, put, select } from "redux-saga/effects";
import 'whatwg-fetch';
import { makeSelectSearchString } from "./selectors";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function get(url) {
  const promise = fetch(url,
    {method: 'GET'});
  promise.then(checkStatus);
  promise.catch(function(e) {
    throw e});
  return promise.then(parseJSON);
}


function* search()
{
  const apiKey = "057dfa32a18eed0f2dc23dc2e80ed8a0";
  const searchString = yield select(makeSelectSearchString());
  const url = "https://api.themoviedb.org/3/search/movie?page=1&include_adult=false&language=en-US&api_key=" + apiKey + "&query=" + searchString;

  try {
    const data = yield call(get, url);
    yield put(changeMovieDB(data));
  } catch (ex) {}
}

export function* watchForSearchActions() {
    yield takeEvery(START_SEARCH, search);
}
