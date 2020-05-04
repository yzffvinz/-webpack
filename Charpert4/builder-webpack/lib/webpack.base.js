const glob = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    return htmlWebpackPlugins.push(new HtmlWebpackPlugin({
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
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader',
          // 'eslint-loader',
        ],
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      { test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      {
        test: /\.png|svg|jpg|gif$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
          },
        }],
      },
      // { test: /\.png|svg|jpg|gif$/, use: ['file-loader'] },
      {
        test: /\.(woff|woff2|eot|ttf|otf)/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWepackPlugin(),
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error'); // eslint-disable-line
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
};
