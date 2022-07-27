const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {

  devtool: 'source-map',

  // APP ENTRY POINT
  entry: path.join(__dirname, 'src', 'index.js'),

  // OUTPUT DIRECTORY
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main.bundle.js'
  },

  // ENVIRONMENT MODE
  mode: process.env.NODE_ENV || 'development',

  // LOADERS
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },

  // PATH RESOLVE
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],

    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    // https://stackoverflow.com/questions/68707553/uncaught-referenceerror-buffer-is-not-defined
    fallback: {
      buffer: require.resolve('buffer')
    }
  },

  // DEV SERVER ENTRY POINT
  devServer: {
    port: 3000,
    historyApiFallback: true
  },

  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    // https://stackoverflow.com/questions/68707553/uncaught-referenceerror-buffer-is-not-defined
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
}
