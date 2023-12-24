const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const cp = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    devtool: slsw.lib.webpack.isLocal
        ? 'eval-cheap-module-source-map'
        : 'source-map',
    resolve: {
        extensions: ['.js', '.json', '.ts', '.yml'],
        symlinks: false,
        cacheWithContext: false,
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.(tsx?)$/,
                loader: 'ts-loader',
                exclude: [
                    [
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, '.serverless'),
                        path.resolve(__dirname, '.webpack'),
                        path.resolve(__dirname, '.serverless_plugins'),
                        path.resolve(__dirname, 'tests'),
                        path.resolve(__dirname, 'dist'),
                    ],
                ],
                options: {
                    transpileOnly: false,
                    experimentalWatchApi: true,
                },
            },
        ],
    },
    plugins: [
        new cp({
            patterns: [
                { from: '../.build/serviceOne/config', to: 'config' }
            ],
        })
    ]
};
