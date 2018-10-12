const path = require('path'); // 路径模块
const merge = require('webpack-merge'); // 引入webpack-merge模块
const baseWebpackConfig = require('./webpack.base.conf'); // 引入webpack基本信息
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin插件,打包html文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 多次build保留最新的，删除旧数据
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin'); // 代码压缩插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css文件
const config = require('../config');
const utils = require('./utils');


const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        // filename: "js/[name].[chunkhash:16].js", // 生成的js文件加上hash值
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:16].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:16].js')
    },
    module: {
        rules:[
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'css-loader',
                    // 'postcss-loader'
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]__[hash:7]'
                        }
                    },
                    // {
                    //     loader: 'css-loader'
                    // },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'app'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loaader',
                    'less-loader',
                    'postcss-loader'
                    // {
                    //     loader: 'style-loader'
                    // },
                    // {
                    //     loader: 'css-loader',
                    //     options: {
                    //         modules: true,
                    //         importLoaders: 1,
                    //         localIdentName: '[local]__[hash:7]'
                    //     }
                    // },
                    // {
                    //     loader: 'style-loader!less-loader'
                    // },
                    // {
                    //     loader: 'postcss-loader'
                    // }
                ]
            }
        ] 
        // rules: utils.styleLoaders({
        //     sourceMap: config.build.productionSourceMap,
        //     extract: true,
        //     usePostCss: true,
        //     cssModule: config.base.cssModule,
        //     cssModuleExcludePath: config.base.cssModuleExcludePath
        // })
    },
    plugins: [
        new HtmlWebpackPlugin({ // 导出html
            template: config.build.index,
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new CleanWebpackPlugin(['../dist'],{  allowExternal: true }), // 清除打包文件
        new MiniCssExtractPlugin({ // 导出css
            // filename: 'css/[name].[hash:16].css',
            // ChunkFilename: 'css/[id].[hash:16].css'
            filename: utils.assetsPath('css/[name].[hash:16].css'),
            chunkFilename: utils.assetsPath('css/[id].[hash:16].css')
        })
    ],
    optimization: {
        minimizer: [
            new UglifyWebpackPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: true
                ?{
                    map: { inline: false }
                } : {}
            })
        ],
        splitChunks: {
            chunks: "all",
            minChunks: 1,
            minSize: 0,
            cacheGroups: {
                framework: {
                    priority: 200,
                    test: "framework", // 可以是字符串、正则、函数
                    name: "framework",
                    enforce: true,
                    reuseExistingChunk: true
                }
            }
        },
        // vendor: {
        //     priority: 10,
        //     test: /node_modules/,
        //     name: "vendor",
        //     enforce: true,
        //     reuesExistingChunk: true
        // }
        // vendor: {
        //     priority: 10,
        //     test: /node_modules/,
        //     name: "vendor",
        //     enforce: true,
        //     reuseExistingChunk: true
        // }
    }
});
// webpack-bundle-analyzer用于打包 output的js文件设计到那些文件打包
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin);
}
// gzip 压缩插件
if (config.build.productionGzipExtensions) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');
    webpackConfig.plugins.push(new CompressionWebpackPlugin({
        test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$')
    }));
}

module.exports =  webpackConfig;
