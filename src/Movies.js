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
