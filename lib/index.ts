import * as path from 'path';
import { NgCliWebpackConfig } from '@angular/cli/models/webpack-config';
import { WebpackTestConfig } from '@angular/cli/models/webpack-test-config';
import { XI18nWebpackConfig } from '@angular/cli/models/webpack-xi18n-config';

const configClasses = {
    'webpack-config': NgCliWebpackConfig,
    'webpack-test-config': WebpackTestConfig,
    'webpack-xi18n-config': XI18nWebpackConfig
};
const configClassNames = {
    'webpack-config': 'NgCliWebpackConfig',
    'webpack-test-config': 'WebpackTestConfig',
    'webpack-xi18n-config': 'WebpackTestConfig'
};

Object.keys(configClasses).forEach(buildConfig);

function buildConfig(variant: string) {
    configClasses[variant].prototype.buildConfigInner = configClasses[variant].prototype.buildConfig;
    configClasses[variant].prototype.buildConfig = function () {
        const config = this.buildConfigInner();

        try {
            const interceptorPath = path.resolve('./ngw.config');
            const interceptor = require(interceptorPath).default;
            return interceptor(config, this.wco);
        } catch (e) {
            console.dir(e);
            if (e.code === 'MODULE_NOT_FOUND') {
                console.warn('ngw.config file is not found at serving directory. Starting common build');
                return config;
            } else { throw e; }

            }
    };

    const webpackConfig = require.resolve(`@angular/cli/models/${variant}`);
    require.cache[webpackConfig][configClassNames[variant]] = configClasses[variant];
}

require('@angular/cli/bin/ng');
