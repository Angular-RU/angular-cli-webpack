# ngw
This package provides an opportunity to modify @angular/cli project's webpack configuration without ["ejecting"](https://github.com/angular/angular-cli/wiki/eject).

## Usage:
- **Installation**<br>
`npm i ngw -D`
- **Setting up**<br>
Run in cli project root (where package.json is)<br>
`node_modules/.bin/ngw --set-up`

Last command makes two things:
1) Changes scripts in package.json that starts from `ng ` to `ngw `
2) Creates file `ngw.config.ts` in project root where you can redefine `webpack.Configuration` used by `@angular/cli`

You may like to do `npm i -D @types/webpack` for better experience.

## Example
This little piece of code in your ngw.config [removes unused selectors from your CSS:](https://github.com/webpack-contrib/purifycss-webpack)

```typescript
import * as webpack from 'webpack';
import { WebpackConfigOptions } from '@angular/cli/models/webpack-config';
import { BuildOptions } from '@angular/cli/models/build-options';

const PurifyCSSPlugin = require('purifycss-webpack');
const path = require('path');
const glob = require('glob');

export default function(config: webpack.Configuration) {
    config.plugins.push(
      new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, '**/*.html'))
      })
    );
    return config;
}
```

## Caution
For complex cases it's more appropriate to use `ng eject` command. Default building process could be changed significanlty in further `@angular/cli` releases so your customization could break (or became broken).

## Roadmap
- [ ] Common recepies
- [ ] Ability to write/publish recepies
- [ ] Isolated webpack changes
- [ ] Separate Dev and Prod configs
