# React 101 - build a functional application from the ground up

[Overview and Prerequisites](overview.md)

[Step 1 - Create Project](create-project.md)



## Setting up React and Babel

Install react and react-dom as a dependency:
``` 
https://reactjs.org/
https://reactjs.org/docs/react-dom.html
https://babeljs.io/
```

``` 
npm i react react-dom -S
```

Install babel-core, babel-loader, babel-preset-env and babel-preset-react as a dev dependency

``` 
npm i babel-core babel-loader babel-preset-env babel-preset-react -D
```


Add **.babelrc** file to provide the options for babel-loader

```
 {
   "presets": ["env", "react"]
 }
```

Add **index.html** file to your src folder

``` 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React101</title>
</head>
<body>
  <section id="index"></section>
</body>
</html>
```

## Install html-webpack-plugin as a dev dependency:

``` 
npm i html-webpack-plugin -D
```

Create file **webpack.config.js**

<pre> 
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [htmlPlugin]
};
</pre>

Next, change your **index.js** file to render a component:

``` 
import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));
```

If you now run ```npm run start``` you should see index.html being generated in the dist folder.

Run ```open dist/index.html``` and you should see “Hello React” in your browser.

## Setup webpack-dev-server
```
 npm i webpack-dev-server -D
```

Change **package.json** start script 

``` 
"scripts": {
    "start": "webpack-dev-server --mode development --open --hot",
    "build": "webpack --mode production"
  },
```

Start webpack dev server on port 8080 (default)
``` 
npm run start
```

# Prototype UI with storybook 
## Add Storybook to the application
``` 
https://storybook.js.org/
```

```
npm i -g @storybook/cli
getstorybook
yarn storybook
quit storybook with ^C
```


Create file **Movies.js** with the following contents

``` 
import React from "react";

export const Movies = () => {
  return <div>Hello React!</div>;
};
```

Modify **index.js** 
``` 
import React from "react";
import ReactDOM from "react-dom";

import {Movies} from './Movies';

ReactDOM.render(<Movies />, document.getElementById("index"));
```

Modify **stories/index.stories.js** 
<pre>
import React from 'react';
import { storiesOf } from '@storybook/react';

import { Movies } from '../src/Movies';

storiesOf('Movies', module)
  .add('storybook', () => <Movies/>);
</pre>

Run storybook again
``` 
yarn storybook
```

Modify Movies.js text
```
import React from "react";

export const App = () => {
  return <div>Hello Jeff!</div>;
};
```

## Turn app into a component
Update **Movies.js**

```
import React from "react";

export class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>Hello Jeff!!</div>);
  }
}
```

## Add internationalization support
```
https://github.com/yahoo/react-intl
```

``` 
yarn add react-intl 
```

Update ***stories/index.stories.js**
``` 
import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';

import { Movies } from '../src/Movies';

storiesOf('Movies', module)
  .addDecorator((getStory) => (
    <IntlProvider locale="en">
      { getStory() }
    </IntlProvider>
  ))
  .add('storybook', () => <Movies/>);

```

Update **Movies.js**
``` 
import React from "react";
import { FormattedMessage } from 'react-intl';

export class Moviesv extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = 'Jeff';
    return (
      <div>
        <FormattedMessage
          id="hello"
          defaultMessage='Hello {name}!!'
          values={{name: name}}/>
      </div>);
  }
}
```

## Add material-ui for prebuilt ui components
``` 
https://material-ui-next.com/
```
```
yarn add material-ui@next
yarn add @material-ui/icons
```

Update **index.js** to show a title 
```
import React from "react";
import { FormattedMessage } from 'react-intl';
import Typography from 'material-ui/Typography';


export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = 'Jeff';
    return (
      <Typography variant='title'>
        <FormattedMessage
          id="hello"
          defaultMessage='Hello {name}!!'
          values={{name: name}}/>
      </Typography>);
  }
}
```

## Build out Rendering of UI 
Add file **Movies.js**
``` 
import React from "react";
import MovieList from './MovieList';
import SearchBox from './SearchBox';
import { FormattedMessage } from 'react-intl';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  container: {
    flexGrow: 1,
  },
  title: {
    flex: 1,
  },
});

export class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = 'Jeff';
    const {classes} = this.props;

    return (
      <div className={classes.container}>
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant='title' className={classes.title}>
                <FormattedMessage
                  id="hello"
                  defaultMessage='Movies for {name}!!'
                  values={{name: name}}/>
              </Typography>
              <SearchBox/>
            </Toolbar>
          </AppBar>
        </div>
        <MovieList/>
      </div>);
  }
}

Movies.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Movies);
```

Add file **MovieList.js**
``` 
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    marginTop: '20px',
    width: '100%',
  },
  table: {
    minWidth: 700,
  },
  overview: {
      width: '50%'
    }

});


let id = 0;
function createData(title, release_date, overview) {
  id += 1;
  return { id, title, release_date, overview };
}

const data = [
  createData("American Pie", "1999-07-09", "At a high-school party, four friends find that losing their collective virginity isn't as easy as they had thought. But they still believe that they need to do so before college. To motivate themselves, they enter a pact to all \"score.\" by their senior prom."),
  createData("American Sniper", "2014-12-11", "U.S. Navy SEAL Chris Kyle takes his sole mission—protect his comrades—to heart and becomes one of the most lethal snipers in American history. His pinpoint accuracy not only saves countless lives but also makes him a prime target of insurgents. Despite grave danger and his struggle to be a good husband and father to his family back in the States, Kyle serves four tours of duty in Iraq. However, when he finally returns home, he finds that he cannot leave the war behind."),
  createData("American Beauty", "1999-09-15", "Lester Burnham, a depressed suburban father in a mid-life crisis, decides to turn his hectic life around after developing an infatuation with his daughter's attractive friend."),
];


export class MovieList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.title}</TableCell>
                  <TableCell>{n.release_date}</TableCell>
                  <TableCell className={classes.overview}>{n.overview}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieList);
```
Add file **SearchBox.js**
``` 
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField';
import  { InputAdornment } from 'material-ui/Input';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
  search: {
    marginLeft: 'auto'
  }
});

export class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.search}>
        <TextField
          id="input-with-icon-adornment"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBox);
```

Update **index.js**
``` 
import React from "react";
import ReactDOM from "react-dom";

import Movies from './Movies';

ReactDOM.render(<Movies />, document.getElementById("index"));
```

Update **stories/index.stories.js**
``` 
import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';

import  Movies from '../src/Movies';

storiesOf('Movies', module)
  .addDecorator((getStory) => (
    <IntlProvider locale="en">
      { getStory() }
    </IntlProvider>
  ))
  .add('storybook', () => <Movies/>);
```
# Application State
## Add application state using redux
``` 
https://github.com/reactjs/redux
https://github.com/reactjs/reselect
https://github.com/facebook/immutable-js
https://github.com/gajus/redux-immutable
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
```
```
yarn add react-redux
yarn add redux-devtools -D
yarn add immutable
yarn add redux-immutable
yarn add reselect
```

Add file **reducers.js**
``` 
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
```

Add file **selectors.js**
``` 
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
```


Update **stories/index.stories.js**
``` 
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
```

Update **MovieList.js**
``` 
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { makeSelectMovies } from "./selectors";

const styles = theme => ({
  root: {
    marginTop: '20px',
    width: '100%',
  },
  table: {
    minWidth: 700,
  },
  overview: {
      width: '50%'
    }

});

export class MovieList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes, movies} = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.title}</TableCell>
                  <TableCell>{n.release_date}</TableCell>
                  <TableCell className={classes.overview}>{n.overview}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
  movies: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  movies: makeSelectMovies(),
});

export default withStyles(styles)(connect(mapStateToProps)(MovieList));
```

## Add Lodash to simplify collection manipulation
```
https://lodash.com/
yarn add reselect
```
Update **selectors.js**
```
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
```

# Make it do something
## Add actions to the UI that update State
Add file **actions.js**
``` 
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
```

Update **SearchBox.js**
``` 
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import  { InputAdornment } from 'material-ui/Input';
import Search from '@material-ui/icons/Search';
import { makeSelectSearchString } from "./selectors";
import { changeSearchString, startSearch } from "./actions";

const styles = theme => ({
  search: {
    marginLeft: 'auto'
  }
});

export class SearchBox extends React.Component {
  constructor(props) {
    super(props);

  }

 render() {
    const { classes, searchString, onInputSearchString, onKeyDown } = this.props;
    return (
      <div className={classes.search}>
        <TextField
          value={searchString}
          id="input-with-icon-adornment"
          placeholder="Search..."
          onChange={onInputSearchString}
          onKeyDown={onKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
  searchString: PropTypes.string,
  onInputSearchString: PropTypes.func,
  onKeyDown: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  searchString: makeSelectSearchString(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onInputSearchString: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(changeSearchString(evt.target.value));
    },
    onKeyDown: (evt) => {
      if (evt.keyCode === 13)
      {
        dispatch(startSearch());
      }
    },
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchBox));
```

Update **reducers.js**
``` 
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
```

## Listen for external Side effecting Actions
```
https://redux-saga.js.org/
yarn add redux-saga
```

``` 
https://github.com/gaearon/react-hot-loader
yarn add react-hot-loader
yarn add babel-runtime
yarn add babel-plugin-transform-runtime -D
```

Update **.babelrc**
``` 
{
  "plugins": ["react-hot-loader/babel", ["transform-runtime", {
    "polyfill": false,
    "regenerator": true
  }]],
  "presets": ["env", "react"]
}
```

Add file **sagas.js** 
```
import { START_SEARCH } from "./actions";
import { takeEvery } from "redux-saga/effects";

function* search()
{
  console.log("search called");
}

export function* watchForSearchActions() {
    yield takeEvery(START_SEARCH, search);
}
```

Update **index.js**
``` 
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import "babel-core/register"

import { AppContainer } from 'react-hot-loader';
import Movies from './Movies';
import { moviesApp } from './reducers';
import { watchForSearchActions } from "./sagas";



/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware();

const enhancers = [
  applyMiddleware(sagaMiddleware),
];

const store = createStore(
  moviesApp,
  composeEnhancers(...enhancers)
);

sagaMiddleware.run(watchForSearchActions);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <IntlProvider locale="en">
        <Provider store={store}>
            <Component />
        </Provider>
      </IntlProvider>
    </AppContainer>,
    document.getElementById('index')
  );
};

render(Movies);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Movies', () => {
    // if you are using harmony modules ({modules:false})
    render(Movies);
    // in all other cases - re-require App manually
    render(require('./Movies')); // eslint-disable-line global-require
  });
}
```

## Hook up to the remote to referesh data
``` 
https://github.com/whatwg/fetch
yarn add whatwg-fetch
```
Update **actions.js**
``` 
export const CHANGE_SEARCH_STRING = 'react101/CHANGE_SEARCH_STRING';
export const START_SEARCH = 'react101/START_SEARCH';
export const CHANGE_MOVIEDB = 'react101/CHANGE_MOVIEDB';

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


export function changeMovieDB(movies) {
  return {
    type: CHANGE_MOVIEDB,
    movies
  };
}
```

Update **sagas.js**
```
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
```

Update **reducers.js**
``` 
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
```
