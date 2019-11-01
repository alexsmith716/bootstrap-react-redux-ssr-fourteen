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

#### =================================

babel-runtime operations >>> babel-polyfill >>> emulate an ES2015 environment but in a different way

babel-polyfill: emulates ES2015 by assigning methods on the global (adds Promise to global scope)
babel-runtime: doesn't change the global namespace

typescript will not add any polyfill to your code

opposed to Babel, TypeScript does not have a runtime

set target to ES6+ and use Babel on the result

#### =================================

Typescript && Babel Bundling Methods:

METHOD 1:
Babel   >>>>>>>> webpack > babel-loader > typescript loader (ATL)
(combine 2 compilers > merge JS outputted from TS compile > pipe that JS output through Babel-loader > result is ES5 with Babel provided polyfills)

METHOD 2:
Babel 7 >>>>>>>> '@babel/preset-typescript' && '@babel/plugin-transform-typescript' > babel preset '@babel/typescript' > webpack 'test: /\.(js|ts)x?$/'

#### =================================

`typescript` and `prop-types` serve different purposes:
* 'Typescript' validates types at compile time
* 'PropTypes' are checked at runtime

