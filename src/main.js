import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import firebase from 'firebase/app';

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyCW0IK8xQ1CNtY1_FP2gMwVEHflWHNma00',
    authDomain: 'react-minesweeper-a1c7c.firebaseapp.com',
    databaseURL: 'https://react-minesweeper-a1c7c.firebaseio.com',
    projectId: 'react-minesweeper-a1c7c',
    storageBucket: 'react-minesweeper-a1c7c.appspot.com',
    messagingSenderId: '180848845291'
};
firebase.initializeApp(config);

import Routes from './routes';

import thunk from 'redux-thunk';
import mainReducer from './reducers/mainReducer';

import mainCSS from './components/main.scss'

let store = createStore(
    mainReducer,
    applyMiddleware(thunk)
);

let rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    rootElement
);
