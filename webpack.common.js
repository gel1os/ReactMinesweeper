const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: [
    './client/main'
  ],
  output: {
    path: path.join(__dirname, 'dist', 'static'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Minesweeper",
      template: "./client/template.html",
      filename: devMode ? 'index.html' : 'main.html',
      minify: false
    }),
    new CopyPlugin([
      { from: path.join(__dirname, 'client/icons'), to: path.join(__dirname, 'dist/static/icons') },
      { from: path.join(__dirname, 'client/favicons'), to: path.join(__dirname, 'dist/static') },
      { from: path.join(__dirname, 'sitemap.xml'), to: path.join(__dirname, 'dist/static') },
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "css/[id].css"
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'client'),
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
