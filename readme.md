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
2) Creates file `ngw-config.ts` in project root where you can redefine `webpack.Configuration` used by `@angular/cli`

You may like to do `npm i -D @types/webpack` for better experience.

## Roadmap

- [ ] Common recepies
- [ ] Ability to write/publish recepies
- [ ] Isolated webpack changes
- [ ] Separate Dev and Prod configs
