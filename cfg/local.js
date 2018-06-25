const path = require('path')
const webpack = require('webpack')
const srcPath = path.resolve('src')

module.exports = {
  devtool: 'eval',
  mode:'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './src/index.tsx',
  ],
  output: {
    path: path.resolve('build'),
    filename: 'app.js',
    publicPath: '/build/'
  },
  resolve: {
    alias:{
			images: path.resolve('images')
		},
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      { // Try to bootstrap image as base64, fallback to file-loader
				test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
				options: {
					limit:8192,
					fallback:'file-loader',
					name:'[name].[ext]',
					publicPath: '/build/'
				}
			},
      {
        test: /\.css$/,
        loader: ['style-loader','css-loader']
      },
      {
        test: /\.scss$/,
        loader: ['style-loader','css-loader','sass-loader']
      },
      {
        test: /\.tsx?$/,
        loader: ["babel-loader","awesome-typescript-loader"]
      },
      {
        test: /\.js$/,
        loader: ['babel-loader','source-map-loader'],
        include: srcPath
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    // new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.HotModuleReplacementPlugin()
  ]
}
