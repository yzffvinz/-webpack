'use strict';

const path = require('path');
const glob = require('glob');
const { HotModuleReplacementPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWepackPlugin = require('friendly-errors-webpack-plugin');


const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: ['commons', pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      },
    }));
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
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
    new CleanWebpackPlugin(),
    new FriendlyErrorsWepackPlugin()
  ].concat(htmlWebpackPlugins),
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only'
   }
};
