const path = require('path');
const webpack = require('webpack');

const WebpackBar = require('webpackbar');

// const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const CompressionPlugin = require('compression-webpack-plugin');
// const BrotliPlugin = require('brotli-webpack-plugin');
// const WebpackPwaManifest = require('webpack-pwa-manifest');

const rootPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(rootPath, './build');
const assetPath = path.resolve(rootPath, './build/dist');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { DuplicatesPlugin } = require('inspectpack/plugin');

const generatedIdent = (name, localName, lr) => {
  const r = Buffer.from(lr).toString('base64');
  return name + '__' + localName + '--' + r.substring( r.length-12, r.length-3 );
};

// https://github.com/bholloway/resolve-url-loader/blob/master/packages/resolve-url-loader/README.md#configure-webpack
// source-maps required for loaders preceding resolve-url-loader (regardless of devtool)

// https://webpack.js.org/api/node/
// https://webpack.js.org/configuration/stats/

// https://webpack.js.org/plugins/split-chunks-plugin/
// https://github.com/webpack/webpack/blob/master/examples/many-pages/README.md

// https://cssnano.co/guides/
// https://cssnano.co/guides/presets/

// Combining gzip compression with minification leads to the best reduction in file size

module.exports = {

  context: path.resolve(__dirname, '..'),
  // the entry and module.rules.loader option is resolved relative to this directory
  name: 'client',
  target: 'web',
  mode: 'production',
  // devtool: (none) > fastest > quality: bundled code

  entry: {
    main: [
      // './src/theme/scss/global/global.styles.scss',
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

  // webpack runs default optimizations depending on chosen mode (prod/dev)
  // https://webpack.js.org/configuration/optimization/
  // >>>>>>>>> override the below default optimizations <<<<<<<<<<<<
  optimization: {
    minimize: true, // tell webpack to minimize bundle using 'TerserPlugin' defaults
    // override selected defaults enabling 'minimizer'
    // >>>>>>>>>> need to review all defaults <<<<<<<<<<
    // https://github.com/terser/terser#minify-options
    // https://github.com/terser/terser#output-options
    // minimizer: [
    //   new TerserPlugin({
    //     extractComments: false,
    //     terserOptions: {
    //       mangle: false,
    //       output: {
    //         beautify: false,
    //         comments: false,
    //       },
    //     },
    //   }),
    // ],
    // Code Splitting: Prevent Duplication: Use the SplitChunksPlugin to dedupe and split chunks!
    // https://webpack.js.org/plugins/split-chunks-plugin/
    // react-hot-loader | react-redux | react-router-dom | react-router
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
    // modules: [ 'client', 'node_modules' ],
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
      // chunkFilename: '[name].[contenthash].chunk.css',
      // hot: false,
      // orderWarning: true,
      // reloadAll: true,
      // cssModules: true
    }),

    // https://github.com/NMFR/optimize-css-assets-webpack-plugin
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: { discardComments: { removeAll: true } },
    //   canPrint: true, // can plugin print messages to the console, default: true
    // }),

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

    // https://webpack.js.org/plugins/provide-plugin/
    // Use modules without having to use import/require
    // ProvidePlugin: Whenever the identifier is encountered as free variable in a module, 
    //    the module is loaded automatically and the identifier is filled with the exports of 
    //    the loaded module (of property in order to support named exports).

    // To automatically load jquery point variables it exposes to the corresponding node module
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      // Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      // Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),

    new webpack.HashedModuleIdsPlugin(),

    // globDirectory: base directory to match globPatterns against, relative to the current working directory
    // [maximumFileSizeToCacheInBytes] will not have any effect, it only modifies files matched by 'globPatterns'
    // 'Update on reload' automatically reload SW when a new one is available

    // https://developers.google.com/web/tools/workbox/guides/precache-files/webpack
    // tell Workbox to precache the files by adding the following code to your service worker:
    // This will precache any of the files from the Webpack plugin
    // workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

    // https://developers.google.com/web/tools/workbox/modules/workbox-precaching
    // Serving Precached Responses:
    // Calling workbox.precaching.precacheAndRoute() or 
    //  workbox.precaching.addRoute() will create a route that matches requests for precached URLs

    // The response strategy used in this route is cache-first: 
    //  the precached response will be used, unless that cached response is not present 
    //  (due to some unexpected error), in which case a network response will be used instead

    // https://developers.google.com/web/tools/workbox/modules/workbox-routing#how_to_register_a_navigation_route
    // How to Register a Navigation Route:
    // for a SPA, use a 'NavigationRoute' to return a specific response for all navigation requests
    // 'NavigationRoute':
    //    https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.routing.NavigationRoute
    // navigation requests: 
    //    https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#first_what_are_navigation_requests

    // navigateFallback:
    //    meant to be used in a SPA scenario, in which all navigations use a common App Shell HTML

    // https://developers.google.com/web/tools/workbox/reference-docs/latest/
    // handler: 'CacheFirst'
    // handler: 'CacheOnly'
    // handler: 'NetworkFirst'
    // handler: 'NetworkOnly'
    new GenerateSW({
      swDest: path.join(buildPath, 'service-worker.js'),
      clientsClaim: true,
      skipWaiting: true,
      // importWorkboxFrom: 'local',
      importWorkboxFrom: 'cdn',
      navigateFallback: '/dist/index.html',
      // // Exempt all URLs that start with /_ or contain admin anywhere:
      // navigateFallbackBlacklist: [/^\/_/, /admin/],
      // // Include URLs that start with /pages:
      // navigateFallbackWhitelist: [/^\/pages/],
      // // Do not precache:
      exclude: [/\.map$/,],
      // exclude: [/\.(?:png|jpg|jpeg|svg)$/],
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
        // {
        //   // To match cross-origin requests, use a RegExp that matches
        //   // the start of the origin:
        //   urlPattern: new RegExp('^https://api\.github\.com/'),
        //   handler: 'NetworkFirst',
        //   // handler: 'StaleWhileRevalidate',
        //   // options: {
        //   //   cacheableResponse: {
        //   //     statuses: [0, 200]
        //   //   }
        //   // }
        // },
        // {
        //   // Match any same-origin request that contains 'api'.
        //   urlPattern: /api/,
        //   // Apply a network-first strategy.
        //   handler: 'NetworkFirst',
        //   options: {
        //     // Fall back to the cache after 10 seconds.
        //     networkTimeoutSeconds: 10,
        //     // Use a custom cache name for this route.
        //     cacheName: 'my-api-cache',
        //     // Configure custom cache expiration.
        //     expiration: {
        //       maxEntries: 5,
        //       maxAgeSeconds: 60,
        //     },
        //     // Configure background sync.
        //     backgroundSync: {
        //       name: 'my-queue-name',
        //       options: {
        //         maxRetentionTime: 60 * 60,
        //       },
        //     },
        //     // Configure which responses are considered cacheable.
        //     cacheableResponse: {
        //       statuses: [0, 200],
        //       headers: {'x-test': 'true'},
        //     },
        //     // Configure the broadcast cache update plugin.
        //     broadcastUpdate: {
        //       channelName: 'my-update-channel',
        //     },
        //     // Add in any additional plugin logic you need.
        //     plugins: [
        //       {cacheDidUpdate: () => /* custom plugin code */}
        //     ],
        //     // matchOptions and fetchOptions are used to configure the handler.
        //     fetchOptions: {
        //       mode: 'no-cors',
        //     },
        //     matchOptions: {
        //       ignoreSearch: true,
        //     },
        //   },
        // },
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
