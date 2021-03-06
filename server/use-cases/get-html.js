import fs from 'fs';
import util  from 'util';
import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore} from 'redux';

import App from 'client/components/App';
import mainReducer from 'client/reducers/mainReducer';

const getApp = (store, url = '*') =>
  <Provider store={store}>
    <StaticRouter>
      <Route path={url} location={{pathname: url}} component={App} />
    </StaticRouter>
  </Provider>;

const readFile = util.promisify(fs.readFile);

async function getHtml(url) {
  const mainHtmlPath = path.resolve(__dirname + '/../../static/main.html');

  const store = createStore(mainReducer);
  const html = renderToString(getApp(store, url));
  const preloadedState = store.getState();

  const data = await readFile(mainHtmlPath, 'utf8');

  const finalHtml = data.replace('<!-- ::APP:: -->', html)
    .replace(
      '//::REDUX_STORE::',
        `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}`
    );

  return finalHtml;
}

export {getHtml};