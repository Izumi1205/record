'use strict';
const path = require('path');
module.exports = {
    base: {
        // 是否开始cssModule
        cssModule: true,
        // cssModule 排除的目录，其他css库可以放这里
        cssModuleExcludePath: /public/
    },
    dev: {
        assetsSubDirectory: './static',
        assetPublicPath: '/',
        index: path.resolve(__dirname, '../public/index.html'),
        proxyTable: {},
        host: 'localhost',
        port: 8080,
        autoOpenBrowser: true,
        // 是否生成sourceMap
        cssSourceMap: true
    },
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        index: path.resolve(__dirname, '../public/index.html'),
        productionGzip: true,
        bundleAnalyzerReport: process.env.npm_config_report,
        productionGzipExtensions: ['js', 'css'],
    }
}