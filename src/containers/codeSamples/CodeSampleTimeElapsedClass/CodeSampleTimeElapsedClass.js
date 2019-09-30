import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const CodeSampleTimeElapsedClass = () => {

  return (

      <div className="container">

        <Helmet title="Code Sample TimeElapsedClass" />

        <h1 className="mt-4 mb-3">Util TimeElapsedClass</h1>

        <h4 className="mt-4 mb-3">file: src > utils > timeElapsedClass.js</h4>

        <div className="row">

          <div>

            <pre className="pre-style" >
{`
// accessor properties: getters and setters

class TimeElapsedClass {

  constructor() {}
  // constructor(startTime) {
  //   this._startTime = startTime;
  // }

  set startTime(startTime) {
    this._startTime = startTime;
  }

  get startTime() {
    return this._startTime;
  }

  // -----------------------------

  get secondsElapsed() {
    return (Date.now() - this._startTime) / 1000;
  }

  secondsElapsedX(elapsed) {
    return (elapsed - this._startTime) / 1000;
  }

}

export default new TimeElapsedClass();

`}
            </pre>

          </div>
        </div>
      </div>
  );
};

export default CodeSampleTimeElapsedClass;
