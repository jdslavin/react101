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
