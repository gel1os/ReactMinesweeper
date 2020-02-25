const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: [
    './src/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Minesweeper",
      template: "./template.html"
    }),
    new CopyPlugin([
      { from: path.join(__dirname, 'src/icons'), to: path.join(__dirname, 'dist/icons') },
      { from: path.join(__dirname, 'favicons'), to: path.join(__dirname, 'dist') }
    ]),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }, 
    {
      test: /\.svg$/,
      use: {
        loader: 'svg-url-loader',
        options: {}
      }
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    }]
  }
};
