import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { Router, StaticRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import { renderRoutes } from 'react-router-config';
import { getStoredState } from 'redux-persist'; 
import { CookieStorage, NodeCookiesWrapper } from 'redux-persist-cookie-storage'; 
import { trigger } from 'redial';

import asyncMatchRoutes from './utils/asyncMatchRoutes';
import routes from './routes';
import configureStore from './redux/configureStore';
import initialStatePreloaded from './redux/initial-preloaded-state';
// import { getUserAgent, isBot } from './utils/device';

import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import Html from './helpers/Html';
import config from '../config/config';
import apiClient from './helpers/apiClient';

import { HelmetProvider } from 'react-helmet-async';
import serialize from 'serialize-javascript';

// const getRandomInt = (min, max) => (
//   Math.floor(Math.random() * (max - min)) + min
// )

// function binding: creating a function that calls another function with a specific 'this' value and with specific arguments
// function binding: technique used in conjunction with callbacks and event handlers
// function binding: used to preserve code execution context while passing functions around as variables

// HOF is a function which returns a function
// function currying: create a function that has arguments already set
// basic approach: use a closure to return a new function ()
// closure: 
//    * the combination of a function (return async function(req, res)) 
//    * and the lexical environment within which that function was DECLARED ({ clientStats })
// --------------------------
export default ({ clientStats }) => async (req, res, next) => {
// export default function({ clientStats }) {
//   // anonymous wrapper that creates a closure with access to above lexical env var '{ clientStats }'
//   // returned as express middleware
//   return async function(req, res) {

  // req.counterPreloadedState = Math.floor(Math.random() * (100 - 1)) + 1;
  // req.userAgent = getUserAgent(req.headers['user-agent']);
  // req.isBot = isBot(req.headers['user-agent']);

  const history = createMemoryHistory({ initialEntries: [req.originalUrl] });

  const preloadedState = initialStatePreloaded(req);

  const providers = {
    client: apiClient(req)
  };

  const store = configureStore({
    history,
    data: {...preloadedState},
    helpers: providers
  });

  function hydrate(a) {
    res.write('<!doctype html>');
    ReactDOM.renderToNodeStream(<Html assets={a} store={store} />).pipe(res);
  }

  try {

    const { components, match, params } = await asyncMatchRoutes(routes, req.path);

    const triggerLocals = {
      ...providers,
      store,
      match,
      params,
      history,
      location: history.location
    };

    await trigger('fetch', components, triggerLocals);

    const helmetContext = {};

    const context = {};

    const component = (
      <HelmetProvider context={helmetContext}>
        <Provider store={store} {...providers}>
          <Router history={history}>
            <StaticRouter location={req.originalUrl} context={context}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Router>
        </Provider>
      </HelmetProvider>
    );

    const content = ReactDOM.renderToString(component);

    const assets = flushChunks(clientStats, { chunkNames: flushChunkNames() });

    const status = context.status || 200;

    if (__DISABLE_SSR__) {
      return hydrate(assets);
    }

    if (context.url) {
      return res.redirect(301, context.url);
    }

    const { location } = history;

    if (decodeURIComponent(req.originalUrl) !== decodeURIComponent(location.pathname + location.search)) {
      return res.redirect(301, location.pathname);
    }

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`SERVER.JS: The script uses approximately ${Math.round(used * 100) / 100} MB`);

    const reduxStore = serialize(store.getState());

    const html = <Html assets={assets} content={content} store={reduxStore} />;

    const ssrHtml = `<!DOCTYPE html><html lang="en-US">${ReactDOM.renderToString(html)}</html>`;
    res.status(200).send(ssrHtml);

  } catch (error) {
    res.status(500);
    hydrate(flushChunks(clientStats, { chunkNames: flushChunkNames() }));
  }
};
