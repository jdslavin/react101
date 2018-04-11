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

Install html-webpack-plugin as a dev dependency:

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


Create file **app.js** with the following contents

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

Modify app.js text
```
import React from "react";

export const App = () => {
  return <div>Hello Jeff!</div>;
};
```

## Turn app into a component
Update **app.js**

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

Update **app.js**
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

## Add application state using redux
``` 
https://github.com/reactjs/redux
```
```
yarn add react-redux
yarn add redux-devtools -D
```

