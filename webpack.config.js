var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassLoaders = [
    "css-loader",
    {
        loader: 'postcss-loader',
        options: {
          config: {
            path: './postcss.config.js'
          }
        }
      },
    "sass-loader"
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
        rules: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, 'src')
        },{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader", 
                use: sassLoaders
            })
        }, {
            test: /\.scss$/, 
            use: ExtractTextPlugin.extract({
                fallback: "style-loader", 
                use: sassLoaders
            })
        }]
    },
    watch: true
};
