import * as webpack from 'webpack';
import { WebpackConfigOptions } from '@angular/cli/models/webpack-config';
import { BuildOptions } from '@angular/cli/models/build-options';
import { WebpackTestOptions } from '@angular/cli/models/webpack-test-config';
import { XI18WebpackOptions } from '@angular/cli/models/webpack-xi18n-config';

export type WebpackOptions = WebpackConfigOptions<BuildOptions> | WebpackTestOptions | XI18WebpackOptions;

const command = process.argv[2].toLowerCase();
const isTest = (o: WebpackOptions): o is WebpackTestOptions => command === 'test';
const isI18n = (o: WebpackOptions): o is XI18WebpackOptions => o['locale'];

export default function (config: webpack.Configuration, options: WebpackOptions) {
    if (isTest(options)) {
        console.log('Test configuration is running');
    } else if (isI18n(options)) {
        console.log('This build uses i18n');
    } else {
        console.log('Common build is running');
    }

    console.log('To modify webpack build, you can use ngw.config.ts');
    return config;
}
