# Angular CLI Webpack (ngw)

> This package provides an opportunity to modify @angular/cli project's webpack configuration without ["ejecting"](https://github.com/angular/angular-cli/wiki/eject).

[![Build Status](https://api.travis-ci.org/Angular-RU/angular-cli-webpack.svg?branch=master)](https://travis-ci.org/Angular-RU/angular-cli-webpack)  [![npm version](https://badge.fury.io/js/ngw.svg)](https://badge.fury.io/js/ngw) [![dependencies Status](https://david-dm.org/angular-ru/angular-cli-webpack/status.svg)](https://david-dm.org/angular-ru/angular-cli-webpack)
[![Coverage Status](https://coveralls.io/repos/github/Angular-RU/angular-cli-webpack/badge.svg?branch=master)](https://coveralls.io/github/Angular-RU/angular-cli-webpack?branch=master) [![Coverage Status](https://img.shields.io/npm/dt/ngw.svg)](https://npm-stat.com/charts.html?package=ngw&from=2017-01-12)

## Installation
For angular 6:
```bash
$ npm i -g @angular/cli # before usage you need install cli
$ ng new my-project && cd my-project # go into any project on angular
$ npm i -D ngw # installing an improved cli-eject
$ ./node_modules/.bin/ngw --set-up # run via terminal in project root
Set up went successfully!
```
For angular 5 use `npm i -D ngw@angular5`
## Usage:
Last command installation (ngw --set-up) makes two things:
1) Changes scripts in package.json that starts from `ng ` to `ngw `
2) Creates file `ngw.config.ts` in project root where you can redefine `webpack.Configuration` used by `@angular/cli`

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

#### Prod and dev mode modifications (ngw.config.ts)

```typescript
export default function(config, options) {
  //common config modification
  ...
  switch(options.buildOptions.enviroment) {
    case 'prod':
      config = productionModificationsMerged(config);
      break
    case 'dev':
      //etc
  }
}
```


## Caution

For complex cases it's more appropriate to use `ng eject` command. Default building process could be changed significanlty in further `@angular/cli` releases so your customization could break (or became broken).
