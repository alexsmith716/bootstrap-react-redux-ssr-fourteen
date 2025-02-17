import React from 'react';
import { Helmet } from 'react-helmet-async';

const CodeSampleReduxInfo = () => {

  return (

      <div className="container">

        <Helmet title="Code Sample Redux Info" />

        <h1 className="mt-4 mb-3">Redux Module Info</h1>

        <h4 className="mt-4 mb-3">file: src > redux > modules > info.js</h4>

        <div className="row">

          <div>

            <pre className="pre-style" >
{`
// Actions
// -------------------
const LOAD = 'redux-example/info/LOAD';
const LOAD_SUCCESS = 'redux-example/info/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/info/LOAD_FAIL';

import { getSomeAsyncData } from '../../utils/mockAPI';

const initialState = {
  loaded: false,
  data: null,
};

// Reducer
// -------------------
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case LOAD:
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        // error: action.error,
        error: true,
        errorResponse: {message: action.error.message, documentation_url:''},
      };

    default:
      return state;
  }
}

// Actions (action creators)
// -------------------
export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

// export function load() {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: () => mockAPI(() => getRandomInt(), 1000 )
//   };
// };

export function load() {
  let location = 'https://api.github.com/feeds';
  // let location = 'https://www.metaweather.com/api/location/2459115/';
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    // promise: () => mockAPI(() => getRandomInt())
    // promise: () => mockAPI(() => getSomeAsyncData(location))
    promise: async () => {
      try {
        const response = await getSomeAsyncData(location);
        return response;
      } catch (error) {
        return Promise.reject(error);
        throw error;
      }
    }
  };
};

// export function load(value) {
//   let w = 'https://www.metaweather.com/api/location/2459115/';
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: ({ client }) => client.get(w)
//   };
// };

`}
            </pre>

          </div>
        </div>
      </div>
  );
};

export default CodeSampleReduxInfo;
