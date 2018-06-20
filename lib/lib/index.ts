import * as path from 'path';
import { BrowserBuilder } from '@angular-devkit/build-angular/src/browser/index';
import { ServerBuilder } from '@angular-devkit/build-angular/src/server/index';
import { KarmaBuilder } from '@angular-devkit/build-angular/src/karma/index';
import { ExtractI18nBuilder } from '@angular-devkit/build-angular/src/extract-i18n/index';
import { WebpackOptions } from '../static/ngw.config';

const configClasses = {
    'browser': BrowserBuilder,
    'server': ServerBuilder,
    'karma': KarmaBuilder,
    'extract-i18n': ExtractI18nBuilder
};
const configClassNames = {
    'browser': 'BrowserBuilder',
    'server': 'ServerBuilder',
    'karma': 'KarmaBuilder',
    'extract-i18n': 'ExtractI18nBuilder'
};

Object.keys(configClasses).forEach(buildConfig);

function buildConfig(variant: string) {
    const methodName = configClasses[variant].prototype.hasOwnProperty('_buildWebpackConfig')
        ? '_buildWebpackConfig'
        : 'buildWebpackConfig';

    configClasses[variant].prototype.buildConfigInner = configClasses[variant].prototype[methodName];
    configClasses[variant].prototype[methodName] = configClasses[variant].prototype.buildConfig = function (...args) {
        const config = this.buildConfigInner(...args);

        try {
            const interceptorPath = path.resolve('./ngw.config');
            const interceptor = require(interceptorPath).default;
            const options: WebpackOptions = {
                root: args[0],
                projectRoot: args[1],
                options: args[-1]
            };
            return interceptor(config, ...args);
        } catch (e) {
            console.dir(e);
            if (e.code === 'MODULE_NOT_FOUND') {
                console.warn('ngw.config file is not found at serving directory. Starting common build');
                return config;
            } else { throw e; }

            }
    };

    const webpackConfig = require.resolve(`@angular-devkit/build-angular/src/${variant}/index`);
    require.cache[webpackConfig][configClassNames[variant]] = configClasses[variant];
}

require('@angular/cli/bin/ng');
