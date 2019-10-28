# bootstrap-react-redux-ssr-thirteen

## Overview:

App builds off 'bootstrap-react-redux-webpack-ssr-thirteen and brrs-two-components'. 

=============================================================
=============================================================

### TypeScript compiler > target > ES5/6

Will initially target ES6
 
https://github.com/microsoft/TypeScript-Handbook

#### compilerOptions:

* lib:    List of library files to be included in the compilation
* target: Specify ECMAScript target version

#### Babel uses https://github.com/kangax/compat-table to check which JavaScript features to convert and polyfill for specified browserslistrc/babelrc > (presets:[[{targets}]]) target environments

List of library files to be included in the compilation.
Possible values are:
► ES5
► ES6
► ES2015
► ES7
► ES2016
► ES2017
► ES2018
► ESNext
► DOM
► DOM.Iterable
► WebWorker
► ScriptHost
► ES2015.Core
► ES2015.Collection
► ES2015.Generator
► ES2015.Iterable
► ES2015.Promise
► ES2015.Proxy
► ES2015.Reflect
► ES2015.Symbol
► ES2015.Symbol.WellKnown
► ES2016.Array.Include
► ES2017.object
► ES2017.Intl
► ES2017.SharedMemory
► ES2017.String
► ES2017.TypedArrays
► ES2018.Intl
► ES2018.Promise
► ES2018.RegExp
► ESNext.AsyncIterable
► ESNext.Array
► ESNext.Intl
► ESNext.Symbol

