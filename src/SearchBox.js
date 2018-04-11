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

