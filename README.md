# Angular CLI Webpack (ngw)

> This package provides an opportunity to modify @angular/cli project's webpack configuration without ["ejecting"](https://github.com/angular/angular-cli/wiki/eject).

[![Build Status](https://api.travis-ci.org/Angular-RU/angular-cli-webpack.svg?branch=master)](https://travis-ci.org/Angular-RU/angular-cli-webpack)  [![npm version](https://badge.fury.io/js/ngw.svg)](https://badge.fury.io/js/ngw) [![dependencies Status](https://david-dm.org/angular-ru/angular-cli-webpack/status.svg)](https://david-dm.org/angular-ru/angular-cli-webpack)
[![Coverage Status](https://coveralls.io/repos/github/Angular-RU/angular-cli-webpack/badge.svg?branch=master)](https://coveralls.io/github/Angular-RU/angular-cli-webpack?branch=master) [![Coverage Status](https://img.shields.io/npm/dt/ngw.svg)](https://npm-stat.com/charts.html?package=ngw&from=2017-01-12)

## Installation
For angular 6/7:
```bash
$ npx -p @angular/cli ng new my-project && cd my-project # create new Angular CLI project
$ npm i -D ngw # installing an improved cli-eject
$ ./node_modules/.bin/ngw --set-up # run via terminal in project root
Set up went successfully!
```
For angular 5 use `npm i -D ngw@angular5`
## Usage:
Last command installation (ngw --set-up) makes three things:
1) Changes scripts in package.json that starts from `ng ` to `ngw `
2) Creates file `ngw.config.ts` in project root where you can redefine `webpack.Configuration` used by `@angular/cli`
3) Sets `complierOptions.module = "commonjs"` property in `tsconfig.json`

So just make changes to the webpack config in appeared `ngw.config.ts`

You may like to do `npm i -D @types/webpack` for better experience.

## Example

#### Removes unused selectors from your CSS

This little piece of code in your ngw.config [removes unused selectors from your CSS:](https://github.com/webpack-contrib/purifycss-webpack)

```typescript
const PurifyCSSPlugin = require('purifycss-webpack');
const path = require('path');
const glob = require('glob');

export default function(config) {
    config.plugins.push(
      new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, '**/*.html'))
      })
    );
    return config;
}
```
#### Debugging
You may like to debug your configuration. 
This can be done with [ndb](https://github.com/GoogleChromeLabs/ndb) package.
1) Make sure that your development environment meets the requirements of `ndb`
2) `npm i -g ndb`
3) Add `debugger` keyword in `ngw.config.ts`
4) `ndb npm run start`

#### Prod and dev mode modifications (ngw.config.ts)
```typescript

const isProduction = process.argv.indexOf('--prod') !== -1;

export default function(config, options) {
  //common config modification
  ...
  config = isProduction
    ? productionModificationsMerged(config)
    : devModificationsChane(config);
  }
  ...
}
```
