import * as webpack from 'webpack';
import { WebpackConfigOptions as ConfigOptions } from '@angular/cli/models/webpack-config';
import { BuildOptions } from '@angular/cli/models/build-options';

export type Configuration = webpack.Configuration;
const DEFAULT_COMMAND = process.argv[2];

export default function (config: Configuration, options: ConfigOptions<BuildOptions>, argv) {
    console.log('For modify webpack build, you can usage ngw.config.ts');
    const command = argv || DEFAULT_COMMAND;

    return config;
}
