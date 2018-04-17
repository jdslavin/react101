# Add Actions to the UI
## Add actions to the UI that update State

Add file **src/actions.js**
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

Update **src/SearchBox.js**
```diff
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
+ import { createStructuredSelector } from 'reselect';
+ import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import  { InputAdornment } from 'material-ui/Input';
import Search from '@material-ui/icons/Search';
+ import { makeSelectSearchString } from "./selectors";
+ import { changeSearchString, startSearch } from "./actions";

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
+    const { classes, searchString, onInputSearchString, onKeyDown } = this.props;
-     const {classes} = this.props;
    return (
      <div className={classes.search}>
        <TextField
+          value={searchString}
          id="input-with-icon-adornment"
          placeholder="Search..."
+          onChange={onInputSearchString}
+          onKeyDown={onKeyDown}
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
+  searchString: PropTypes.string,
+  onInputSearchString: PropTypes.func,
+  onKeyDown: PropTypes.func
};

+ const mapStateToProps = createStructuredSelector({
+   searchString: makeSelectSearchString(),
+ });

+ export function mapDispatchToProps(dispatch) {
+  return {
+    onInputSearchString: (evt) => {
+      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
+      dispatch(changeSearchString(evt.target.value));
+    },
+    onKeyDown: (evt) => {
+      if (evt.keyCode === 13)
+      {
+        dispatch(startSearch());
+      }
+    },
+  };
+ }

+ export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchBox));
- export default withStyles(styles)(SearchBox);
```

Update **src/reducers.js**
```diff 
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
+ import { CHANGE_SEARCH_STRING } from "./actions";

const initialState = fromJS({
  searchString: '',
  moviesDB: {},
});

function movies(state = initialState, action) {
  switch (action.type) {
+    case CHANGE_SEARCH_STRING:
+      return state
+        .set("searchString", action.searchString);
    default:
      return state
  }
}

export const moviesApp = combineReducers({
  movies
});
```

Run storybook and watch the actions in the redux addin, take a look at state also and state changes.
