import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="*" component={App} />
      </BrowserRouter>
    );
  }
}

