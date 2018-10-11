const path = require('path');
const APP_PATH = path.resolve(__dirname, '../app'); // 应用路径，需要使用babel-loader转码打包的代码
const DIST_PATH = path.resolve(__dirname, '../dist'); // 打包存放的路径
const config = require('../config'); // config output path
module.exports = {
    entry: {
        app: './app/index.js',
        framework: ['react', 'react-dom']
    },
    output: {
        filename:'js/bundle.js',
        path: DIST_PATH
        // path: config.build.assetsRoot,
        // publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetPublicPath
    },
    module: {
        rules: [
            {//  test 和  use  属性是必须要配置的
                test: /\.js?$/,
                use: "babel-loader",
                include: APP_PATH
            },
            // 使用css-loader编译css文件
            // {
            //     test: /\.(css)$/,
            //     use: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // }
        ]
    }
}