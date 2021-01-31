import React from 'react';
import { hydrate, render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'

import Routes from './routes';

import thunk from 'redux-thunk';
import mainReducer from './reducers/mainReducer';

import mainCSS from './components/main.scss'

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(
  mainReducer,
  preloadedState,
  applyMiddleware(thunk)
);

window.store = store;
const rootElement = document.getElementById('root');
const renderMethod = !!module.hot ? render : hydrate;
renderMethod(
  <Provider store={store}>
    <Routes />
  </Provider>,
  rootElement
);
