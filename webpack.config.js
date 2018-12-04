const webpack = require('webpack')
const path = require('path')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

let config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // files ending with .js
        exclude: /node_modules/, // exclude the node_modules directory
        loader: "babel-loader" // use this (babel-core) loader
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
      }
    ]
  },
  plugins: [
    new extractTextWebpackPlugin('styles.css'),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    inline: true,
    open: true
  },
  devtool: 'eval-source-maps'
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new uglifyJsPlugin(),
    new optimizeCssAssetsWebpackPlugin()
  )
}

module.exports = config;