import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const CodeSampleWebpackProdServer = () => {

  return (

      <div className="container">

        <Helmet title="Code Sample Webpack Prod Server" />

        <h1 className="mt-4 mb-3">Webpack Production Server Build</h1>

        <h4 className="mt-4 mb-3">file: webpack > prod.server.js</h4>

        <div className="row">

          <div>

            <pre className="pre-style" >
{`
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const externals = require('./node-externals');

const WebpackBar = require('webpackbar');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { DuplicatesPlugin } = require('inspectpack/plugin');

const rootPath = path.resolve(__dirname, '..');

const generatedIdent = (name, localName, lr) => {
  const r = Buffer.from(lr).toString('base64');
  return name + '__' + localName + '--' + r.substring( r.length-12, r.length-3 );
};

module.exports = {

  context: path.resolve(__dirname, '..'),

  name: 'server',
  target: 'node',
  externals,
  mode: 'production',
  // devtool: 'hidden-source-map',
  // devtool: 'source-map',

  entry: {
    server: './src/server.js',
    // serverTest: './src/serverTest.js'
  },

  output: {
    path: path.resolve('./build/server'),
    // filename: 'server.js',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                  if (path.basename(loaderContext.resourcePath).indexOf('global.scss') !== -1) {
                    return localName;
                  } else {
                    return generatedIdent(path.basename(loaderContext.resourcePath).replace(/\.[^/.]+$/, ""), localName, loaderContext.resourcePath);
                  }
                },
                mode: 'local',
              },
              onlyLocals: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                sourceMap: true,
                outputStyle: 'compressed',
              },
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                path.resolve(rootPath, 'src/theme/scss/app/functions.scss'),
                path.resolve(rootPath, 'src/theme/scss/app/variables.scss'),
                path.resolve(rootPath, 'src/theme/scss/app/mixins.scss')
              ],
            },
          },
        ]
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader : 'css-loader',
            options: {
              modules: {
                getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                  if (path.basename(loaderContext.resourcePath).indexOf('global.scss') !== -1) {
                    return localName;
                  } else {
                    return generatedIdent(path.basename(loaderContext.resourcePath).replace(/\.[^/.]+$/, ""), localName, loaderContext.resourcePath);
                  }
                },
                mode: 'local',
              },
              onlyLocals: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
        },
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'image/svg+xml'
        }
      },
    ]
  },

  performance: {
    hints: false
  },

  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },

  plugins: [

    new WebpackBar({ name: 'Server' }),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),

    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DLLS__: false
    }),

    new webpack.HashedModuleIdsPlugin(),

    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   reportFilename: '../../analyzers/bundleAnalyzer/prod.serverXXX2.html',
    //   openAnalyzer: false,
    //   generateStatsFile: false
    // }),

    // new DuplicatesPlugin({
    //   emitErrors: false,
    //   emitHandler: undefined,
    //   verbose: true
    // }),
  ],
};
`}

            </pre>

          </div>
        </div>
      </div>
  );
};

export default CodeSampleWebpackProdServer;
