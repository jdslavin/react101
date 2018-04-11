## Prereqs 
```
https://nodejs.org/en/
https://yarnpkg.com/lang/en/docs/install/
```

## Make a new project

```
mkdir react101
cd react101 
```

Create a **package.json**

```
npm init -y
```

Install Webpack into dev dependencies

```
npm i webpack webpack-cli -D
```

Create a **index.js** in src directory
```
mkdir src
```

```
console.log('hello');
```

Add the following scripts into **package.json**

```
"scripts": {
       "start": "webpack --mode development",
       "build": "webpack --mode production"
     },
```     

File should look similar to this:
``` 
{
  "name": "react101",
  "version": "1.0.0",
  "description": "Search app using React",
  "main": "index.js",
  "scripts": {
    "start": "webpack --mode development",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.5.0",
    "webpack-cli": "^2.0.13",
  }
}
```

To run build
``` 
npm run build
```

## Setting up React and Babel

Install react and react-dom as a dependency:

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

``` 
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
```

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

export const App = () => {
  return <div>Hello React!</div>;
};
```

Modify **index.js** 
``` 
import React from "react";
import ReactDOM from "react-dom";

import {App} from './app';

ReactDOM.render(<App />, document.getElementById("index"));
```

Modify **stories/index.stories.js** 
``` 
import React from 'react';
import { storiesOf } from '@storybook/react';

import { App } from '../src/app';

storiesOf('App', module)
  .add('storybook', () => <App/>);
```

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

export class App extends React.Component {
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

import { App } from '../src/app';

storiesOf('App', module)
  .addDecorator((getStory) => (
    <IntlProvider locale="en">
      { getStory() }
    </IntlProvider>
  ))
  .add('storybook', () => <App/>);

```

Update **Movies.js**
``` 
import React from "react";
import { FormattedMessage } from 'react-intl';

export class App extends React.Component {
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

## Add application state using redux
``` 
https://github.com/reactjs/redux
https://github.com/reactjs/reselect
https://github.com/facebook/immutable-js
https://github.com/gajus/redux-immutable
```
```
yarn add react-redux
yarn add redux-devtools -D
yarn add immutable
yarn add redux-immutable
yarn add reselect
```

``` 
https://api.themoviedb.org/3/search/movie?api_key=057dfa32a18eed0f2dc23dc2e80ed8a0&language=en-US&query=American&page=1&include_adult=false
```

