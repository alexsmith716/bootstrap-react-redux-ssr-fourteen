import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { renderRoutes } from 'react-router-config';
import {createBrowserHistory} from 'history';
import { trigger } from 'redial';
import { HelmetProvider } from 'react-helmet-async';

import localForage from 'localforage';
import { getStoredState } from 'redux-persist';
import { AppContainer } from 'react-hot-loader';

import asyncMatchRoutes from './utils/asyncMatchRoutes';
import { Provider } from 'react-redux';
import { RouterTrigger } from './components';
import routes from './routes';
import apiClient from './helpers/apiClient';
import configureStore from './redux/configureStore';
import isOnline from './utils/isOnline';
import './js/app';

// https://github.com/zloirock/core-js/tree/master/packages/core-js-compat
// data about the necessity of core-js modules
// and API for getting a list of required core-js modules by browserslist query
// const { list, targets } = require('core-js-compat')({
//   targets: '> 1%',
//   filter: 'es.',
// });
// console.log(targets);

const persistConfig = {
  key: 'root',
  storage: localForage,
  // redux-persist:
  // inboundState:  the state being rehydrated from storage
  // originalState: the state before the REHYDRATE action
  stateReconciler(inboundState, originalState) {
    // preloadedState from window object
    return originalState;
  },
  // redux-persist:
  // blacklist what state will not be persisted
  // blacklist: ['notifs'],
  // whitelist what state will be persisted
  whitelist: ['device', 'info', 'counter', 'filterableTable', 'temperatureCalculator']
};

const spinnerContainer = document.createElement('div');

spinnerContainer.classList.add('d-inline-flex', 'spinner-layered', 'text-light');
// spinnerContainer.className = 'd-inline-flex spinner-layered text-light';

const dest = document.getElementById('react-root');

document.body.insertBefore(spinnerContainer, dest);

const client = apiClient();

const providers = {
  client
};

(async () => {

  // redux-persist:
  // delays rendering of app UI until persisted state has been retrieved and saved to redux
  const preloadedState = await getStoredState(persistConfig);

  const online = window.REDUX_DATA ? true : await isOnline();

  const history = createBrowserHistory();

  const store = configureStore({
    history,
    data: {
      ...preloadedState,
      ...window.REDUX_DATA,
      online
    },
    helpers: providers,
    persistConfig
  });

  const triggerHooks = async (_routes, pathname) => {

    spinnerContainer.classList.add('spinner-border');

    const { components, match, params } = await asyncMatchRoutes(_routes, pathname);
    
    const triggerLocals = {
      ...providers,
      store,
      match,
      params,
      history,
      location: history.location
    };

    // Don't fetch data for initial route, server has already done the work:
    if (window.__PRELOADED__) {
      // Delete initial data so that subsequent data fetches can occur:
      delete window.__PRELOADED__;
    } else {
      // Fetch mandatory data dependencies for 2nd route change onwards:
      await trigger('fetch', components, triggerLocals);
    }
    // Fetch mandatory data dependencies for 2nd route change onwards:
    await trigger('defer', components, triggerLocals);

    spinnerContainer.classList.remove('spinner-border');
  };

  const hydrate = _routes => {
    const element = (
      <HelmetProvider>
        <AppContainer>
          <Provider store={store} {...providers}>
            <Router history={history}>
              <RouterTrigger trigger={pathname => triggerHooks(_routes, pathname)}>{renderRoutes(_routes)}</RouterTrigger>
            </Router>
          </Provider>
        </AppContainer>
      </HelmetProvider>
    );

    if (dest.hasChildNodes()) {
      ReactDOM.hydrate(element, dest);
    } else {
      ReactDOM.render(element, dest);
    }
  };

  hydrate(routes);

  // https://webpack.js.org/concepts/hot-module-replacement/
  // https://webpack.js.org/api/hot-module-replacement/
  // https://webpack.js.org/guides/hot-module-replacement/
  // https://webpack.js.org/plugins/hot-module-replacement-plugin/
  // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
  // https://github.com/webpack-contrib/webpack-hot-middleware

  // if (__DEVTOOLS__ && !window.__REDUX_DEVTOOLS_EXTENSION__) {
  //   console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > __DEVTOOLS__ <<<<<<<<<<<<<<<<<<<<<<');
  //   const devToolsDest = document.createElement('div');
  //   window.document.body.insertBefore(devToolsDest, null);
  //   const DevTools = require('./containers/DevTools/DevTools').default;

  //   ReactDOM.hydrate(
  //     <Provider store={store}>
  //       <DevTools />
  //     </Provider>,
  //     devToolsDest
  //   );
  // }

  if (!__DEVELOPMENT__ && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > serviceWorker in navigator > SW Registered! > ');
      // registration
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // old content purged and fresh content added to cache
                console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > serviceWorker > new or updated content is available <<<<<<<<<<<<<');
              } else {
                // precaching complete
                console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > serviceWorker > content cached for offline use <<<<<<<<<<<<<');
              }
              break;
            case 'redundant':
              console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > serviceWorker > installed service worker redundant <<<<<<<<<<<<<');
              break;
            default:
              // ignore
          }
        };
      };
    } catch (error) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > serviceWorker > Error registering service worker: ', error);
    }

    await navigator.serviceWorker.ready;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > serviceWorker > SW Ready! <<<<<<<<<<<<<')
    // registration.active
  } else {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > !__DEVELOPMENT__ && serviceWorker in navigator NO!! <<<<<<<<<<<<<');
  }
})();
