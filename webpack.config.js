var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassLoaders = [
    "css-loader",
    "sass-loader",
    "postcss-loader"
];

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/main'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css', { allChunks: true })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        },
        {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))},
        {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))}]
    },
    watch: true
};
