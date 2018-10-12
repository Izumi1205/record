const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const config = require('../config');

module.exports = merge(baseWebpackConfig, {
    mode: "development",
    output: {
        filename: "js/[name].[hash:16].js"
    },
    module: {
        rules: [
            {
                test: /.css?$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            inportLoaders: 1,
                            localIdentName: '[local]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: config.dev.index,
            inject: "body",
            minify: {
                html5: true
            },
            hash: false
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: config.dev.port,
        port: '8080',
        contentBase: path.join(__dirname, '../public'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false,
        noInfo: true,
        open: true,
        proxy: config.dev.proxyTable,
    }
});