import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const CodeSampleReduxCounter = () => {

  return (

      <div className="container">

        <Helmet title="Code Sample Redux Counter MultiReducer" />

        <h1 className="mt-4 mb-3">Redux Module Counter MultiReducer</h1>

        <h4 className="mt-4 mb-3">file: src > redux > modules > counterMultiReducer.js</h4>

        <div className="row">

          <div>

            <pre className="pre-style" >
{`
// Actions
const INCREMENT_COUNTER_MULTIREDUCER = 'redux-example/counter/INCREMENT_COUNTER_MULTIREDUCER';
const DECREMENT_COUNTER_MULTIREDUCER = 'redux-example/counter/DECREMENT_COUNTER_MULTIREDUCER';

const initialState = {
  countMultireducer: 0,
};

// Reducer
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case INCREMENT_COUNTER_MULTIREDUCER:
      return {
        countMultireducer: state.countMultireducer + 1,
      };

    case DECREMENT_COUNTER_MULTIREDUCER:
      return {
        countMultireducer: state.countMultireducer - 1,
      };

    default:
      return state;
  }
}

// Action Creators
export function incrementMultireducer() {
  return {
    type: INCREMENT_COUNTER_MULTIREDUCER
  };
}

export function decrementMultireducer() {
  return {
    type: DECREMENT_COUNTER_MULTIREDUCER
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
