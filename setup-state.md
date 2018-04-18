# Add Application State 
## References 
[Redux - core state management](https://github.com/reactjs/redux)

[Reselect - Library for querying and memoizing state](https://github.com/reactjs/reselect)

[Immutable data type support for javascript](https://github.com/facebook/immutable-js)

[Immutable integration into redux store](https://github.com/gajus/redux-immutable)

[Lodash - High level functions for working with javascript collections](https://lodash.com/)


## Add application state using redux
```
yarn add react-redux
yarn add redux-devtools -D
yarn add immutable
yarn add redux-immutable
yarn add reselect
```

Add google chrome plugin for debugging redux applications
``` 
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
```

Add file **src/reducers.js**
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

Add file **src/selectors.js**
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
```diff 
import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';
+ import { createStore } from 'redux';
+ import { Provider } from 'react-redux';
+ import { fromJS } from 'immutable';

import  Movies from '../src/Movies';
import { moviesApp } from "../src/reducers";

+ function createData(id, title, release_date, overview) {
+  return { id, title, release_date, overview };
+ }

+ const initialState = {
+  movies: fromJS({
+    searchString: '',
+    moviesDB: {"1":   createData("1", "American Pie", "1999-07-09", "At a high-school party, four friends find that losing their collective virginity isn't as easy as they had thought. But they still believe that they need to do so before college. To motivate themselves, they enter a pact to all \"score.\" by their senior prom."),
+    "2": createData("2", "American Sniper", "2014-12-11", "U.S. Navy SEAL Chris Kyle takes his sole mission—protect his comrades—to heart and becomes one of the most lethal snipers in American history. His pinpoint accuracy not only saves countless lives but also makes him a prime target of insurgents. Despite grave danger and his struggle to be a good husband and father to his family back in the States, Kyle serves four tours of duty in Iraq. However, when he finally returns home, he finds that he cannot leave the war behind."),
+    "3": createData("3", "American Beauty", "1999-09-15", "Lester Burnham, a depressed suburban father in a mid-life crisis, decides to turn his hectic life around after developing an infatuation with his daughter's attractive friend."),},
+  }),
+ };

+ const store = createStore(
+  moviesApp,
+  fromJS(initialState),
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
+ );

storiesOf('Movies', module)
  .addDecorator((getStory) => (
    <IntlProvider locale="en">
      { getStory() }
    </IntlProvider>
  ))
+  .add('storybook', () => <Provider store={store}><Movies/></Provider>);
-  .add('storybook', () => <Movies/>);

```

Update **src/MovieList.js** to read movies from state
```diff
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
+ import { createStructuredSelector } from 'reselect';
+ import { connect } from 'react-redux';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
+ import { makeSelectMovies } from "./selectors";

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
+    const {classes, movies} = this.props;
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
+            {data.map(n => {
-            {movies.map(n => {
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
  + movies: PropTypes.array,
};

+ const mapStateToProps = createStructuredSelector({
+  movies: makeSelectMovies(),
+ });

+ export default withStyles(styles)(connect(mapStateToProps)(MovieList));
- export default withStyles(styles)(MovieList);
```

## Add Lodash to simplify collection manipulation
```
yarn add lodash
```

Update **src/selectors.js** to sort movies by title
```diff
import { createSelector } from 'reselect';
import { toJS, List } from 'immutable';
+ import { orderBy } from 'lodash/collection';

const movies = (state) => state.get('movies');

export const makeSelectSearchString = () => createSelector(
  movies,
  (state) => state.get('searchString')
);

export const makeSelectMovies = () => createSelector(
  movies,
  (state) => {
    const movieList = new List(state.get('moviesDB').values()).toJS();
+  return orderBy(movieList, 'title');
-    return movieList;

  }
);
```

[Proceed to Step 7 - Add Actions to the UI](setup-actions.md)
