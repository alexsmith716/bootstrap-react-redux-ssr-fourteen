import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const CodeSampleHerokuStart = () => {

  return (

      <div className="container">

        <Helmet title="Code Sample Heroku Start" />

        <h1 className="mt-4 mb-3">Bin Start</h1>

        <h4 className="mt-4 mb-3">file: bin > start.js</h4>

        <div className="row">

          <div>

            <pre className="pre-style" >
{`
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const app = express();
const port = process.env.PORT;

app.set('port', port);

let isBuilt = false;

const done = () => !isBuilt
  && app.listen(app.get('port'), () => {
    isBuilt = true
  })

app.use(express.static(path.join(__dirname, '..', 'build')));

const clientConfigProd = require('../webpack/prod.client');
const serverConfigProd = require('../webpack/prod.server');

webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {

  const clientStats = stats.toJson().children[0];

  const serverRender = require('../build/server/server.js').default;

  app.use(serverRender({ clientStats }));

  done();
});
`}
            </pre>

          </div>
        </div>
      </div>
  );
};

export default CodeSampleHerokuStart;
