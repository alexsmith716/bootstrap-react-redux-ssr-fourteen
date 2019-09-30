import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const CodeSampleReduxCounter = () => {

  return (

      <div className="container">

        <Helmet title="Code Sample Redux Counter Preloaded" />

        <h1 className="mt-4 mb-3">Redux Module Counter Preloaded</h1>

        <h4 className="mt-4 mb-3">file: src > redux > modules > counterPreloaded.js</h4>

        <div className="row">

          <div>

            <pre className="pre-style" >
{`
// Actions
const INCREMENT_COUNTER_PRELOADED_STATE = 'redux-example/counter/INCREMENT_COUNTER_PRELOADED_STATE';
const DECREMENT_COUNTER_PRELOADED_STATE = 'redux-example/counter/DECREMENT_COUNTER_PRELOADED_STATE';

const initialState = {
  counterPreloadedState: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case INCREMENT_COUNTER_PRELOADED_STATE:
      return {
        ...state,
        counterPreloadedState: state.counterPreloadedState + 1,
      };

    case DECREMENT_COUNTER_PRELOADED_STATE:
      return {
        ...state,
        counterPreloadedState: state.counterPreloadedState - 1,
      };

    default:
      return state
  }
}

// Action Creators
export function incrementPreloadedState() {
  return {
    type: INCREMENT_COUNTER_PRELOADED_STATE
  };
}

export function decrementPreloadedState() {
  return {
    type: DECREMENT_COUNTER_PRELOADED_STATE
  };
}
`}
            </pre>

          </div>
        </div>
      </div>
  );
};

export default CodeSampleReduxCounter;
