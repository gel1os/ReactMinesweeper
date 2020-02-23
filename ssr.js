import { renderToString } from 'react-dom/server';
import {getSSRTemplate} from './src/components/App';
import fs from 'fs';

import { createStore} from 'redux';
import mainReducer from './src/reducers/mainReducer';

const indexHtmlPath = __dirname + '/../dist/index.html';

const store = createStore(mainReducer);
const html = renderToString(getSSRTemplate(store));
const preloadedState = store.getState();

fs.readFile(indexHtmlPath, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const finalHtml = data.replace('<!-- ::APP:: -->', html)
      .replace(
        '//::REDUX_STORE::',
        `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}`
      );

  fs.writeFile(indexHtmlPath, finalHtml, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});