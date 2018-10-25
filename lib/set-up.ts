import * as fs from 'fs';

let packageJsonFile;
let tsConfigFile;
try {
    packageJsonFile = fs.readFileSync('package.json', 'utf-8');
    tsConfigFile = fs.readFileSync('tsconfig.json', 'utf-8');
} catch (e) {
    throw new Error('Cannot find package.json or tsconfig.json in the execution folder');
}
const packageJson = JSON.parse(packageJsonFile.replace(/^\uFEFF/, ''));
Object.keys(packageJson.scripts)
    .map(function (x) {
        return packageJson.scripts[x] =
            packageJson.scripts[x].slice(0, 3) === 'ng ' ?
                'ngw ' + packageJson.scripts[x].slice(3) :
                packageJson.scripts[x];
    });

const tsConfig = JSON.parse(tsConfigFile.replace(/^\uFEFF/, ''));
tsConfig.compilerOptions.module = 'commonjs';

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2) + '\n');
fs.writeFileSync('ngw.config.ts', fs.readFileSync((require.resolve('../static/ngw.config.ts'))));
console.log('Set up went successfully!');
