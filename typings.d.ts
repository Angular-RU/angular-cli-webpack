import { NgCliWebpackConfig } from '@angular/cli/models/webpack-config';

declare module '@angular/cli/models/webpack-config' {
    interface Hack {
        buildConfigInner: Function;
    }

    interface NgCliWebpackConfig<T> extends Hack {}
}