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
import { getUserAgent, isBot } from './utils/device';

import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import Html from './helpers/Html';
import config from '../config/config';
import apiClient from './helpers/apiClient';

import { HelmetProvider } from 'react-helmet-async';

const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min)) + min
)

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
export default ({ clientStats }) => async (req, res) => {
// export default function({ clientStats }) {
//   // anonymous wrapper that creates a closure with access to above lexical env var '{ clientStats }'
//   // returned as express middleware
//   return async function(req, res) {

  req.counterPreloadedState = Math.floor(Math.random() * (100 - 1)) + 1;
  req.userAgent = getUserAgent(req.headers['user-agent']);
  req.isBot = isBot(req.headers['user-agent']);

  // req.ip
  // req.method
  // req.url
  // req.path
  // req.headers
  // req.cookies
  // req.session
  // req.params
  // req.originalUrl

  // 'initialEntries': The initial URLs in the history stack
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

  // store.dispatch(actions.notifs.send({ text: 'Dispatched Message action from server...', type: message.types.success }));

  try {

    const { components, match, params } = await asyncMatchRoutes(routes, req.path);

    // prefetch all data (state) for set of routes on server before render
    // what data do i want to ensure to send on the SSR...
    const triggerLocals = {
      ...providers,
      store,
      match,
      params,
      history,
      location: history.location
    };

    // ensure all data for a set of routes is prefetched on the server before attempting to render
    // in order to accommodate this, define and trigger custom route-level lifecycle hooks on route handlers
    // '@provideHooks' decorator allows defining hooks for custom lifecycle events, 
    //      returning promises if any asynchronous operations need to be performed
    // trigger function: initiate an event for an arbitrary array of components
    // Wait for async data fetching to complete, then render
    // returns a promise
    // Triggering lifecycle events (initiate 'provideHooks' 'fetch' event > App.js)
    // redux > modules > INFO
    await trigger('fetch', components, triggerLocals);

    // <Provider store={store} {...providers}> : 
    //    * makes the Redux store available to any nested components that have been wrapped in the connect() function
    //    * store={store} : the single Redux store in the app
    //    * {...providers} : providing a custom context to access the store (apiClient)

    // <Router history={history}> :
    //    * synchronize a custom history with state management (Redux)
    //    * history={history} : a 'history' object to use for navigation (a dependency of React Router)

    // <StaticRouter location={req.originalUrl} context={context}>
    //    * A <Router> that never changes location
    //    * useful in server-side rendering scenarios because the location never actually changes (SSR to SPA)
    //    * location={req.originalUrl} : The URL the server received, probably 'req.url' on a node server

    // {renderRoutes(routes)} : routes to render

    const helmetContext = {};

    // 'context' object contains the results of the render
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

    // It offers 2 functions flushChunks and flushFiles, which you call immediately after ReactDOMServer.renderToString. 
    // They are used in server-rendering to extract the minimal amount of chunks to send to the client, 
    // thereby solving a missing piece for code-splitting: server-side rendering.
    // 'flushChunks' and 'flushFiles' called immediately after ReactDOMServer.renderToString
    const assets = flushChunks(clientStats, { chunkNames: flushChunkNames() });

    // assets.Js
    // assets.Styles
    // assets.Css
    // assets.js
    // assets.styles
    // assets.css
    // assets.scripts
    // assets.stylesheets
    // assets.cssHashRaw
    // assets.cssHash
    // assets.CssHash
    // assets.publicPath
    // assets.outputPath

    const status = context.status || 200;

    if (__DISABLE_SSR__) {
      return hydrate(assets);
    }

    // 'context.url' will contain the URL to redirect to if a <Redirect> was used
    // test context prop to find out what the result of rendering was
    // send a redirect from the server
    if (context.url) {
      return res.redirect(301, context.url);
    }

    const { location } = history;

    // decodeURIComponent: decode percent-encoded characters in the query string
    // parses a URL Query String into a collection of key and value pairs
    // 'foo=bar&abc=xyz&abc=123' >>>> '{foo: 'bar',abc: ['xyz', '123']}'
    // https://nodejs.org/api/all.html#querystring_querystring_parse_str_sep_eq_options
    if (decodeURIComponent(req.originalUrl) !== decodeURIComponent(location.pathname + location.search)) {
      return res.redirect(301, location.pathname);
    }

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`SERVER.JS: The script uses approximately ${Math.round(used * 100) / 100} MB`);

    const html = <Html assets={assets} store={store} content={content} />;

    const ssrHtml = `<!doctype html>${ReactDOM.renderToString(html)}`;
    res.status(200).send(ssrHtml);

  } catch (error) {
    res.status(500);
    hydrate(flushChunks(clientStats, { chunkNames: flushChunkNames() }));
  }
};
