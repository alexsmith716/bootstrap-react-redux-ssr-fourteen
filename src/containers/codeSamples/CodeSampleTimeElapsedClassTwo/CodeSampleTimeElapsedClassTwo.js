import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const CodeSampleTimeElapsedClassTwo = () => {

  return (

      <div className="container">

        <Helmet title="Code Sample TimeElapsedClassTwo" />

        <h1 className="mt-4 mb-3">Util TimeElapsedClassTwo</h1>

        <h4 className="mt-4 mb-3">file: src > utils > timeElapsedClassTwo.js</h4>

        <div className="row">

          <div>

            <pre className="pre-style" >
{`
// 'this': placeholder for a specific instance
// 'this': (will be known by the time the method is invoked)

// anonymous class expression
// constructor property is optional
// object properties:
// data property ('key: value' - set in constructor, not on the prototype)
// dynamic properties also called accessor properties (getter and a setter)
// function properties (methods)

// defining a method or property on an instance override's version in the prototype
// JS first checks instance before checking prototype

const data = new WeakMap();

const timeElapsedClass = class {

  // initialize instance
  constructor() {
    // this._startTime = Date.now();
    data.set(this, {
      startTime: 0
    });
  }

  // instance methods -----------------------
  setStartTime() {
    // this._startTime = Date.now();
    data.get(this).startTime = Date.now();
  }

  getStartTime() {
    // return this._startTime;
    return data.get(this).startTime;
  }

  getSecondsElapsed() {
    return (Date.now() - data.get(this).startTime) / 1000;
  }
}

export default timeElapsedClass;

`}
            </pre>

          </div>
        </div>
      </div>
  );
};

export default CodeSampleTimeElapsedClassTwo;
