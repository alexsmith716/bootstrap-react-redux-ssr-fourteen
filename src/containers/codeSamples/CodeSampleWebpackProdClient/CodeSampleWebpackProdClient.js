import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const CodeSampleWebpackProdClient = () => {

  return (

      <div className="container">

        <Helmet title="Code Sample Webpack Prod Client" />

        <h1 className="mt-4 mb-3">Webpack Production Client Build</h1>

        <h4 className="mt-4 mb-3">file: webpack > prod.client.js</h4>

        <div className="row">

          <div>

            <pre className="pre-style" >
{`
const path = require('path');
const webpack = require('webpack');

const WebpackBar = require('webpackbar');

// https://webpack.js.org/configuration/mode/
// https://webpack.js.org/concepts/targets/
// follow up again...
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(rootPath, './build');
const assetPath = path.resolve(rootPath, './build/dist');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { DuplicatesPlugin } = require('inspectpack/plugin');

const generatedIdent = (name, localName, lr) => {
  const r = Buffer.from(lr).toString('base64');
  return name + '__' + localName + '--' + r.substring( r.length-12, r.length-3 );
};

module.exports = {

  context: path.resolve(__dirname, '..'),
  name: 'client',
  target: 'web',
  mode: 'production',
  // devtool: (none) > fastest > quality: bundled code

  entry: {
    main: [
      // './src/theme/scss/global/styles.global.scss',
      'bootstrap',
      './src/client.js',
    ]
  },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: assetPath,
    publicPath: '/dist/'
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
        use: [
          {
            loader:ExtractCssChunks.loader,
            options: {
              modules: true
            }
          },
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
                // sourceMapContents: true, default: false
                outputStyle: 'compressed', // default: nested, expanded, compact, compressed
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
        use: [
          {
            loader:ExtractCssChunks.loader,
            options: {
              modules: true
            }
          },
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
        loader: 'file-loader',
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

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
          // mangle: true,
        },
        sourceMap: true
      }),

      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
          map: { 
            inline: false, 
            annotation: true
          }
        }
      })
    ],

    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-universal-component|react-hot-loader)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      }
    },
    // runtimeChunk: true,
    // runtimeChunk: {
    //   name: 'assetManifest',
    // },
  },

  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },

  plugins: [

    new WebpackBar({ name: 'Client' }),

    new CopyPlugin([
      { from: path.resolve(buildPath, './favicon.ico'), to: assetPath },
      { from: path.resolve(buildPath, './manifest.json'), to: assetPath },
      { from: path.resolve(buildPath, './launcher-icon-48-48.png'), to: assetPath },
      { from: path.resolve(buildPath, './launcher-icon-72-72.png'), to: assetPath },
      { from: path.resolve(buildPath, './launcher-icon-96-96.png'), to: assetPath },
      { from: path.resolve(buildPath, './launcher-icon-144-144.png'), to: assetPath },
      { from: path.resolve(buildPath, './launcher-icon-192-192.png'), to: assetPath },
      { from: path.resolve(buildPath, './launcher-icon-512-512.png'), to: assetPath },
    ]),

    new ExtractCssChunks({
      filename: '[name].[contenthash].css',
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),

    // '__DLLS__: false' : needed for SWPrecacheWebpackPlugin
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DLLS__: false
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pwa.js',
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),

    new webpack.HashedModuleIdsPlugin(),

    new GenerateSW({
      swDest: path.join(buildPath, 'service-worker.js'),
      clientsClaim: true,
      skipWaiting: true,
      importWorkboxFrom: 'cdn',
      navigateFallback: '/dist/index.html',
      exclude: [/\.map$/,],
      runtimeCaching: [
        {
          urlPattern: /favicon\.ico/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /manifest\.json/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /json-data/,
          handler: 'NetworkFirst',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
      ],
    }),

    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   reportFilename: '../../analyzers/bundleAnalyzer/prod.client.html',
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

export default CodeSampleWebpackProdClient;
