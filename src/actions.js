export const CHANGE_SEARCH_STRING = 'react101/CHANGE_SEARCH_STRING';
export const START_SEARCH = 'react101/START_SEARCH';

export function changeSearchString(searchString) {
  return {
    type: CHANGE_SEARCH_STRING,
    searchString,
  };
}

export function startSearch() {
  return {
    type: START_SEARCH,
  };
}

