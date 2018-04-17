# Add Async Event Handler
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

Add file **src/sagas.js**
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

Update **src/index.js**
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