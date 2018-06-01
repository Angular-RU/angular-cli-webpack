import * as webpack from 'webpack';
import { Path } from '@angular-devkit/core';
import { NormalizedBrowserBuilderSchema } from '@angular-devkit/build-angular';

export type WebpackOptions<T = NormalizedBrowserBuilderSchema> = {
    root: Path,
    projectRoot: Path,
    options: T;
};

const command = process.argv[2].toLowerCase();

export default function (config: webpack.Configuration, options: WebpackOptions) {
    switch (command) {
        case 'test':
            console.log('Test configuration is running');
            break;
        default:
            console.log('Test configuration is running');
            break;
    }

    console.log('To modify webpack build, you can use ngw.config.ts');
    return config;
}
