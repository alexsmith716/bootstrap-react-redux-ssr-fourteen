import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const CodeSampleLocalStart = () => {

  return (

      <div className="container">

        <Helmet title="Code Sample Local Start" />

        <h1 className="mt-4 mb-3">Bin Local Start</h1>

        <h4 className="mt-4 mb-3">file: bin > localStart.js</h4>

        <div className="row">

          <div>

            <pre className="pre-style" >
{`
const path = require('path');
const express = require('express');
const http = require('http');
const fs = require('fs');
const favicon = require('serve-favicon');
const webpack = require('webpack');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

const unhandledRejections = new Map();

process.on('unhandledRejection', (reason, promise) => {
  console.error('>>>>>>>> BIN > START > process > Unhandled Rejection at promise:', promise);
  console.error('>>>>>>>> BIN > START > process > Unhandled Rejection reason:', reason);
  unhandledRejections.set(promise, reason);
});

process.on('rejectionHandled', promise => {
  console.error('>>>>>>>> BIN > START > process > rejectionHandled > promise:', promise);
  unhandledRejections.delete(promise);
});

const app = express();
const server = http.createServer(app);

app.set('port', port);

app.use(favicon(path.join(__dirname, '..', 'build', 'favicon.ico')));

app.use((req, res, next) => {
  console.log('>>>>>>>>>>>>>>>>> START > REQUEST IN <<<<<<<<<<<<<<<<<<<<<<<');
  // console.log('>>>>>>>>>>>>>>>>> START > REQ.ip +++++++++++++: ', req.ip);
  console.log('>>>>>>>>>>>>>>>>> START > REQ.method +++++++++++++++: ', req.method);
  console.log('>>>>>>>>>>>>>>>>> START > REQ.url ++++++++++++++++++: ', req.url);
  console.log('>>>>>>>>>>>>>>>>> START > REQ.path ++++++++++++++++++: ', req.path);
  // console.log('>>>>>>>>>>>>>>>>> START > REQ.headers ++++++++++++++: ', req.headers);
  // console.log('>>>>>>>>>>>>>>>>> START > REQ.cookies ++++++++++++++: ', req.cookies);
  // console.log('>>>>>>>>>>>>>>>>> START > REQ.session ++++++++: ', req.session);
  // console.log('>>>>>>>>>>>>>>>>> START > REQ.params +++++++++: ', req.params);
  console.log('>>>>>>>>>>>>>>>>> START > REQ.originalUrl ++++: ', req.originalUrl);
  console.log('>>>>>>>>>>>>>>>>> START > REQUEST OUT <<<<<<<<<<<<<<<<<<<<<<<');
  next();
});

// ---------------------------------------------------------------------

let isBuilt = false;

const done = function () {
  if (!isBuilt) {
    server.listen(port, host, err => {
      isBuilt = true;
      console.log('>>>>>>>> BIN > START > STATS COMPILER HAS COMPLETED BUILD !! WAIT IS OVER !');
      console.log('>>>>>>>>>>>>> BIN > LOCALSTART > DONE > process.memoryUsage(): ', process.memoryUsage());
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(\`LOCALSTART.JS: The script uses approximately \${Math.round(used * 100) / 100} MB\`);
    });
  }
};

console.log('>>>>>>>> BIN > START > __DEVELOPMENT__ ?: ', __DEVELOPMENT__);
console.log('>>>>>>>> BIN > START > STATS COMPILER ATTEMPTING BUILD ! PLEASE WAIT ! ...');

app.use(express.static(path.join(__dirname, '..', 'build')));

const clientConfigProd = require('../webpack/prod.client');
const serverConfigProd = require('../webpack/prod.server');

webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
  if (err) {
    console.error('>>>>>>>> BIN > START > WEBPACK COMPILE > PROD > err: ', err.stack || err);
    if (err.details) {
      console.error('>>>>>>>> BIN > START > WEBPACK COMPILE > PROD > err.details: ', err.details);
    }
    return;
  }

  const clientStats = stats.toJson().children[0];

  if (stats.hasErrors()) {
    console.error('>>>>>>>> BIN > START > WEBPACK COMPILE > PROD > stats.hasErrors: ', clientStats.errors);
  }
  if (stats.hasWarnings()) {
    console.warn('>>>>>>>> BIN > START > WEBPACK COMPILE > PROD > stats.hasWarnings: ', clientStats.warnings);
  }

  const serverRender = require('../build/server/server.js').default;

  app.use(serverRender({ clientStats }));

  done();
});

// #########################################################################
// #########################################################################
// #########################################################################

// a running Node process stores all memory inside Resident Set
// Resident Set contains Javascript code (Code segment) and the Stack (all the variables)
// query Node heap
console.log('>>>>>>>>>>>>> BIN > LOCALSTART > process.memoryUsage(): ', process.memoryUsage());

// "rss"        Resident Set Size, the total memory allocated for the process execution
// "heapTotal"  total size of allocated heap
// "heapUsed"   actual memory used during execution of our process
// "external"   memory used by “C++ objects bound to JavaScript objects managed by V8

// "heapTotal" and "heapUsed" refer to V8's memory usage. "external" refers to the memory usage of C++ objects bound to 
//   JavaScript objects managed by V8. "rss", Resident Set Size, is the amount of space occupied in the main memory device 
//   (that is a subset of the total allocated memory) for the process, which includes the heap, code segment and stack.

// The heap is where objects, strings, and closures are stored. Variables are stored in the stack and 
//   the actual JavaScript code resides in the code segment.

// When using Worker threads, "rss" will be a value that is valid for the entire process, while 
//   the other fields will only refer to the current thread.

console.log('>>>>>>>>>>>>> BIN > START > Node > process.nextTick() > START <<<<<<<<<<<<<<<<');

process.nextTick(() => {
  console.log('>>>>>>>>>>>>> BIN > START > Node > process.nextTick() > nextTick CALLBACK <<<<<<<<<<<<<<<<<<<');
});

console.log('>>>>>>>>>>>>> BIN > START > Node > process.nextTick() > SCHEDULED <<<<<<<<<<<<');

// #########################################################################

const gracefulShutdown = (msg, cb) => {
  console.log(\`>>>>>>>> BIN > START > Mongoose Connection closed through: \${msg}\`);
  cb();
};

// listen for Node processes / events
// https://nodejs.org/api/process.html

// Node process is about to exit (called explicitly OR event loop has no additional work to perform)
process.on('exit', code => {
  console.log(\`>>>>>>>> BIN > START > About to exit with code: \${code}\`);
});

// exceptional conditions that are brought to user attention
process.on('warning', warning => {
  console.warn('>>>>>>>> BIN > START > Node process warning.name:', warning.name);
  console.warn('>>>>>>>> BIN > START > Node process warning.message:', warning.message);
  console.warn('>>>>>>>> BIN > START > Node process warning.stack:', warning.stack);
});

// listen to Node process for Signal Events

// Monitor App termination
process.on('SIGINT', m => {
  console.log('>>>>>>>> BIN > START > CHILD got Node process SIGINT message:', m);
  gracefulShutdown('app termination', () => {
    console.log('>>>>>>>> BIN > START > Mongoose SIGINT gracefulShutdown');
    process.exit(0);
  });
});

// For nodemon restarts
process.once('SIGUSR2', m => {
  console.log('>>>>>>>> BIN > START > CHILD got Node process SIGUSR2 message:', m);
  gracefulShutdown('nodemon restart', () => {
    console.log('>>>>>>>> BIN > START > Mongoose SIGUSR2 gracefulShutdown');
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For Heroku app termination
process.on('SIGTERM', m => {
  console.log('>>>>>>>> BIN > START > CHILD got Node process SIGTERM message:', m);
  gracefulShutdown('Heroku app termination', () => {
    console.log('>>>>>>>> BIN > START > Mongoose SIGTERM gracefulShutdown');
    process.exit(0);
  });
});
`}
            </pre>

          </div>
        </div>
      </div>
  );
};

export default CodeSampleLocalStart;
