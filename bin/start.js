const fs = require('fs');
require('colors');
const path = require('path');
const express = require('express');
const compression = require('compression');
const http = require('http');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const { getUserAgent } = require('../src/utils/device');
const { isBot } = require('../src/utils/device');
// const device = require('../src/utils/device'); // getUserAgent isBot

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

console.log('>>>>>>>>>>>>>>>>> START > __CLIENT__ ?: ', __CLIENT__);
console.log('>>>>>>>>>>>>>>>>> START > __SERVER__ ?: ', __SERVER__);
console.log('>>>>>>>>>>>>>>>>> START > __DEVELOPMENT__ ?: ', __DEVELOPMENT__);
console.log('>>>>>>>>>>>>>>>>> START > __DISABLE_SSR__ ?: ', __DISABLE_SSR__);
console.log('>>>>>>>>>>>>>>>>> START > __DLLS__ ?: ', __DLLS__);
console.log('>>>>>>>>>>>>>>>>> START > HOST ?: ', host);
console.log('>>>>>>>>>>>>>>>>> START > PORT ?: ', port);

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
app.use(morgan('dev'));
app.use(compression());
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

app.use(express.static(path.join(__dirname, '..', 'build')));

app.use((req, res, next) => {
  req.userAgent = getUserAgent(req.headers['user-agent']);
  req.isBot = isBot(req.headers['user-agent']);
  next();
});

// ---------------------------------------------------------------------

let isBuilt = false;

const done = function () {
  if (!isBuilt) {
    server.listen(port, host, err => {
      isBuilt = true;
      console.log('>>>>>>>> BIN > START > STATS COMPILER HAS COMPLETED BUILD !! WAIT IS OVER !');
      if (err) {
        console.error('>>>>>>>> BIN > START > ERROR:', err);
      }
      console.log('>>>>>>>>>>>>> BIN > LOCALSTART > DONE > process.memoryUsage(): ', process.memoryUsage());
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(`LOCALSTART.JS: The script uses approximately ${Math.round(used * 100) / 100} MB`);
    });
  }
};

console.log('>>>>>>>> BIN > START > __DEVELOPMENT__ ?: ', __DEVELOPMENT__);
console.log('>>>>>>>> BIN > START > STATS COMPILER ATTEMPTING BUILD ! PLEASE WAIT ! ...');

if (__DEVELOPMENT__) {
  const clientConfigDev = require('../webpack/dev.client');
  const serverConfigDev = require('../webpack/dev.server');
  const { publicPath } = clientConfigDev.output;

  const serverOptions = {
    stats: { colors: true },
    publicPath
  };

  app.use('/dlls/:dllName.js', (req, res, next) => {
    console.log('>>>>>>>>>>>>>>>>> START > app.use > DLLs <<<<<<<<<<<<<<<<<<<<<<<');
    /* eslint-disable max-len */
    fs.access(path.join(__dirname, '..', 'build', 'dlls', `${req.params.dllName}.js`), fs.constants.R_OK, err => err ? res.send(`################## NO DLL !!! (${req.originalUrl})') ##################`) : next());
  });

  const compiler = webpack([clientConfigDev, serverConfigDev]);
  const clientCompiler = compiler.compilers[0];
  const devMiddleware = webpackDevMiddleware(compiler, serverOptions);
  app.use(devMiddleware);

  app.use((req, res, next) => {
    next();
  });

  app.use(webpackHotMiddleware(clientCompiler));

  app.use(webpackHotServerMiddleware(compiler, { chunkName: 'server' }));

  devMiddleware.waitUntilValid(done);
} else {
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
}

console.log('>>>>>>>>>>>>> BIN > LOCALSTART > process.memoryUsage(): ', process.memoryUsage());
console.log('>>>>>>>>>>>>> BIN > START > Node > process.nextTick() > START <<<<<<<<<<<<<<<<');

process.nextTick(() => {
  console.log('>>>>>>>>>>>>> BIN > START > Node > process.nextTick() > nextTick CALLBACK <<<<<<<<<<<<<<<<<<<');
});

console.log('>>>>>>>>>>>>> BIN > START > Node > process.nextTick() > SCHEDULED <<<<<<<<<<<<');

const gracefulShutdown = (msg, cb) => {
  console.log(`>>>>>>>> BIN > START > Mongoose Connection closed through: ${msg}`);
  cb();
};

process.on('exit', code => {
  console.log(`>>>>>>>> BIN > START > About to exit with code: ${code}`);
});

process.on('warning', warning => {
  console.warn('>>>>>>>> BIN > START > Node process warning.name:', warning.name);
  console.warn('>>>>>>>> BIN > START > Node process warning.message:', warning.message);
  console.warn('>>>>>>>> BIN > START > Node process warning.stack:', warning.stack);
});

process.on('SIGINT', m => {
  console.log('>>>>>>>> BIN > START > CHILD got Node process SIGINT message:', m);
  gracefulShutdown('app termination', () => {
    console.log('>>>>>>>> BIN > START > Mongoose SIGINT gracefulShutdown');
    process.exit(0);
  });
});

process.once('SIGUSR2', m => {
  console.log('>>>>>>>> BIN > START > CHILD got Node process SIGUSR2 message:', m);
  gracefulShutdown('nodemon restart', () => {
    console.log('>>>>>>>> BIN > START > Mongoose SIGUSR2 gracefulShutdown');
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGTERM', m => {
  console.log('>>>>>>>> BIN > START > CHILD got Node process SIGTERM message:', m);
  gracefulShutdown('Heroku app termination', () => {
    console.log('>>>>>>>> BIN > START > Mongoose SIGTERM gracefulShutdown');
    process.exit(0);
  });
});
