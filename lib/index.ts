import * as path from 'path';
import { NgCliWebpackConfig } from '@angular/cli/models/webpack-config';

NgCliWebpackConfig.prototype.buildConfigInner = NgCliWebpackConfig.prototype.buildConfig;

NgCliWebpackConfig.prototype.buildConfig = function () {
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

const webpackConfig = require.resolve('@angular/cli/models/webpack-config');
require.cache[webpackConfig].NgCliWebpackConfig = NgCliWebpackConfig;

require('@angular/cli/bin/ng');
