import { NgCliWebpackConfig } from '@angular/cli/models/webpack-config';
import { WebpackTestConfig } from '@angular/cli/models/webpack-test-config';
import { XI18nWebpackConfig } from '@angular/cli/models/webpack-xi18n-config.d';

declare module '@angular/cli/models/webpack-config' {
    interface Hack {
        buildConfigInner: Function;
    }

    interface NgCliWebpackConfig<T> extends Hack {}
    interface WebpackTestConfig extends Hack {}
    interface XI18nWebpackConfig extends Hack {}
}
