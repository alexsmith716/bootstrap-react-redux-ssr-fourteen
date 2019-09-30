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

export function load() {
  let location = 'https://api.github.com/feeds';
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
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
