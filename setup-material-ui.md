# Setup Material UI 

## Add material-ui for prebuilt ui components
``` 
https://material-ui-next.com/
```
```
yarn add material-ui@next
yarn add @material-ui/icons
```

Update **src/Movies.js** to show a title, we added the Typography component to draw the name as a title.
```
import React from "react";
import { FormattedMessage } from 'react-intl';
import Typography from 'material-ui/Typography';


export class Movies extends React.Component {
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

Run storybook to see the changes to the UI.


## Build out Rendering of UI 
Update file **src/Movies.js**
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

Add file **src/MovieList.js** (note data is included in the component for now)
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
Add file **src/SearchBox.js**
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

Update **src/index.js**
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
Take a look at your storybook now, it should render the UI.  This is a good point to review the UI with other people to see if 
this is what people are expecting in a user interface.
