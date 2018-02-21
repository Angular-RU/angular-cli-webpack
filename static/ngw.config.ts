import * as webpack from 'webpack';
import {WebpackConfigOptions} from '@angular/cli/models/webpack-config';
import {BuildOptions} from '@angular/cli/models/build-options';

export default function(config: webpack.Configuration, options: WebpackConfigOptions<BuildOptions>, command = process.argv[2]) {
    console.log(config);
    return config;
}
