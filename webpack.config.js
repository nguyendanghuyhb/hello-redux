const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const config = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'development'`
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    },
    mode: 'development'
};

const clientConfig = {
    ...config,
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'client.js',
        publicPath: '/'
    }
};

const serverConfig = {
    ...config,
    entry: ['babel-polyfill','./src/server.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        publicPath: '/'
    },
    target: "node",
    externals: nodeExternals()
};

module.exports = [clientConfig, serverConfig];
