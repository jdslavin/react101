import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

import  Movies from '../src/Movies';
import { moviesApp } from "../src/reducers";

function createData(id, title, release_date, overview) {
  return { id, title, release_date, overview };
}

const initialState = {
  movies: fromJS({
    searchString: '',
    moviesDB: {"1":   createData("1", "American Pie", "1999-07-09", "At a high-school party, four friends find that losing their collective virginity isn't as easy as they had thought. But they still believe that they need to do so before college. To motivate themselves, they enter a pact to all \"score.\" by their senior prom."),
    "2": createData("2", "American Sniper", "2014-12-11", "U.S. Navy SEAL Chris Kyle takes his sole mission—protect his comrades—to heart and becomes one of the most lethal snipers in American history. His pinpoint accuracy not only saves countless lives but also makes him a prime target of insurgents. Despite grave danger and his struggle to be a good husband and father to his family back in the States, Kyle serves four tours of duty in Iraq. However, when he finally returns home, he finds that he cannot leave the war behind."),
    "3": createData("3", "American Beauty", "1999-09-15", "Lester Burnham, a depressed suburban father in a mid-life crisis, decides to turn his hectic life around after developing an infatuation with his daughter's attractive friend."),},
  }),
};

const store = createStore(
  moviesApp,
  fromJS(initialState),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

storiesOf('Movies', module)
  .addDecorator((getStory) => (
    <IntlProvider locale="en">
      { getStory() }
    </IntlProvider>
  ))
  .add('storybook', () => <Provider store={store}><Movies/></Provider>);
