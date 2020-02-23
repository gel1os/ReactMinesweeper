import React from 'react';
import { StaticRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './App';

export const getSSRTemplate = (store) =>
  <Provider store={store}>
    <StaticRouter>
      <Switch>
        <Route path="*" component={App} />
      </Switch>
    </StaticRouter>
  </Provider>

export default App;