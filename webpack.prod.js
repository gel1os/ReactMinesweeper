const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
      new HtmlWebpackPartialsPlugin([
        {
          path: path.join(__dirname, './client/partials/analytics.html'),
          priority: 'low',
          location: 'head',
          template_filename: 'main.html'
        }
      ])
    ],
});