const path = require('path');
const webpack = require('webpack');
const srcPath = path.resolve('src');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });
module.exports = {
  devtool: 'nosources-source-map',
  entry: {
    app:'./src/index.js',
    server:'./server.js'
  },
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    publicPath: 'build'
  },
  target:'node',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader']
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: srcPath
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()

  ]
}
