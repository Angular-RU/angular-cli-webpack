"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var webpack_config_1 = require("@angular/cli/models/webpack-config");
webpack_config_1.NgCliWebpackConfig.prototype.buildConfigInner = webpack_config_1.NgCliWebpackConfig.prototype.buildConfig;
webpack_config_1.NgCliWebpackConfig.prototype.buildConfig = function () {
    var config = this.buildConfigInner();
    try {
        var interceptorPath = path.resolve('./ngw.config');
        var interceptor = require(interceptorPath).default;
        return interceptor(config, this.wco);
    }
    catch (e) {
        console.warn('ngw.config file is not found at serving directory. Starting common build');
        return config;
    }
};
require.cache[require.resolve('@angular/cli/models/webpack-config')].NgCliWebpackConfig = webpack_config_1.NgCliWebpackConfig;
require('@angular/cli/bin/ng');
