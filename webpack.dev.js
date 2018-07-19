const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        hot: true,
        historyApiFallback: true,
        port: 3000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    watch: true
});