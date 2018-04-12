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
