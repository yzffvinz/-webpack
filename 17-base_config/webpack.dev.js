'use strict';

const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      { test: /.js$/, use: 'babel-loader'},
      { test: /.css$/, use: ['style-loader', 'css-loader'] },
      { test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // {
      //   test: /\.png|svg|jpg|gif$/,
      //   use: [{
      //    loader: 'url-loader',
      //     options: {
      //       limit: 10240
      //     }
      //   }]
      // },
      { test: /\.png|svg|jpg|gif$/, use: ['file-loader'] },
      { test: /\.(woff|woff2|eot|ttf|otf)/, use: ['file-loader']}
    ]
  },
  watch: true,
  plugins: [
    new HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
