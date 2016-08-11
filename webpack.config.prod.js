/*********************************************
    WEBPACK - PRODUCTION COMPILER CONFIG
**********************************************/

var webpack = require('webpack');
var path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var buildPath = path.join(__dirname);
var tsConfigPath = path.join(__dirname, '../tsconfig.json');

module.exports = {
  resolve: {
    extensions: ["", ".ts", ".tsx", ".webpack.js", ".web.js", ".js", ".sass", ".scss"],
  },
  entry: [
    './app/app.tsx'
  ],
  module: {
    loaders: [
      { test: /\.ts(x)?$/, loaders: ["ts-loader?tsconfig=" + tsConfigPath] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style","css!sass!postcss-loader?parser=postcss-scss") },
      { test: /\.(ttf|eot|svg|woff2?)(\?[a-z0-9]+)?$/, loader: 'url-loader' },
      { test: /\.(png|jpeg|jpg|gif)$/, loader: 'url-loader?limit=1000' }
    ]
  },
  output: {
    filename: 'app.js',
    path: buildPath
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve('app/prod.html'), to: 'index.html' }
    ]),
    new ExtractTextPlugin("styles.css")
  ],
  postcss: function () {
      return [ require('autoprefixer') ];
  }
};