// Actions
// -------------------
const LOAD = 'redux-example/lineChart/LOAD';
const LOAD_SUCCESS = 'redux-example/lineChart/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/lineChart/LOAD_FAIL';

const ADD_NEW_DATA_LOAD = 'redux-example/lineChart/ADD_NEW_DATA_LOAD';
const ADD_NEW_DATA_LOAD_SUCCESS = 'redux-example/lineChart/ADD_NEW_DATA_LOAD_SUCCESS';
const ADD_NEW_DATA_LOAD_FAIL = 'redux-example/lineChart/ADD_NEW_DATA_LOAD_FAIL';

// import { mockAPI, postRequestConcatExportASYNC, postRequestConcatExportSYNC } from '../../utils/mockAPI';
import { postRequestConcatExportASYNC } from '../../utils/mockAPI';

const initialState = {
  loaded: false,
  data: null,
};

// "concat" method adds multiple elements to the array and returns a copy

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
        error: false,
        errorResponse: {message:'', documentation_url:''},
        data: action.result.values,
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: true,
        errorResponse: action.result,
      };

    case ADD_NEW_DATA_LOAD:
      return {
        ...state,
        loading: true,
      };

    case ADD_NEW_DATA_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        // loaded: true,
        error: false,
        errorResponse: {message:'', documentation_url:''},
        data: action.result.data,
      };

    case ADD_NEW_DATA_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        // loaded: false,
        error: true,
        errorResponse: {message: action.error.message, documentation_url:''},
      };

    default:
      return state;
  }
}

// Actions (action creators)
// -------------------
export function loadFunc(req) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get(req.request)
  };
};

//  https://developer.mozilla.org/en-US/docs/Web/API/Body/blob
// Promise: an object that represents an intermediate state of an operation
// Promise: a result of some kind to be returned
// 'async' keyword: turns any function into a promise (invoking the function returns a promise)
// '.then()' block consumes value returned when promise fulfills
// 'await' keyword: placed before promise-based function to pause code until promise fulfills
// use 'await' when calling any function that returns a Promise

// error handling:
// retry fetching the asset ...
// show a default error message ...
// prompt user to to something else (provide a different asset URL) ...
// using synchronous 'try...catch' structure with async/await

// thenable API

// going to 'clientMiddleware' > 'YES promise'
// going to Reducer switch action 'LOAD'
// going to API 'postRequestConcat'
// going to API 'postRequestConcatResolveRejectPromise' and returning Promise
// going to 'clientMiddleware' > 'actionPromise'
// going to 'LineChart' > 'mounting' lifecycle
// >>>>>>>>>> API RESOLVED ?
// going to API 'postRequestConcatExport' and returning response
// going to Reducer 'postRequestConcatExport' and response received from API
// going to Reducer switch action 'LOAD_SUCCESS'
// >>>>>>>>>> API REJECTED ?
// going to Reducer try/catch block > catch (error) > Promise.reject(error)
// going to Reducer switch action 'LOAD_FAIL'

// when promise rejects control jumps to the closest rejection handler

// best tool for the job
// may not need sync 'generator pattern' for code flow
// may not need control to wait until promise settles
// real, real-world practice using promises & async/await

export function addNewDataFunc(req) {
  return {
    types: [ADD_NEW_DATA_LOAD, ADD_NEW_DATA_LOAD_SUCCESS, ADD_NEW_DATA_LOAD_FAIL],
    promise: () => postRequestConcatExportASYNC(req)
      .then(result => {
        result.message += ' P4,'
        return result;
      })
      .then(result => {
        result.message += ' P5,'
        return result;
      })
      .then(
        result => {
          result.message += ' P6.'
          return result;
        }, 
        error => {
          return Promise.reject(error);
          throw error;
        }
      )
      // .catch(error => {
      //   console.log('>>>>>>>>>>>>>>>> ########## lineChart ########## > redux > Action > addNewDataFunc() > CATCH:ERROR:', error);
      //   return Promise.reject(error);
      //   throw error;
      // })
  };
}

// export function addNewDataFuncSYNC(req) {
//   return {
//     types: [ADD_NEW_DATA_LOAD, ADD_NEW_DATA_LOAD_SUCCESS, ADD_NEW_DATA_LOAD_FAIL],
//     promise: async () => {
//       try {
//         const response = await postRequestConcatExportSYNC(req);
//         return response;
//       } catch (error) {
//         return Promise.reject(error);
//         throw error;
//       }
//     }
//   };
// }
