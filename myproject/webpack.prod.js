
const cssnano = require('cssnano');
const merge = require('webpack-merge');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base.js');
const speedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const HappyPack = require('happypack');
const TerserPlugin = require('terser-webpack-plugin');
const smp = new speedMeasureWebpackPlugin();
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const prodConfig = {
  mode: 'none',
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workers: 3
          //   }
          // },
          // 'babel-loader',
          'happypack/loader'
          // 'eslint-loader',
        ],
      }
    ]
  },
  plugins: [
    new OptimizeCSSAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ],
    // }),
    new HappyPack({
      loaders: ['babel-loader']
    })
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    // splitChunks: {
    //   minSize: 0,
    //   cacheGroups: {
    //     commons: {
    //       name: 'commons',
    //       chunks: 'all',
    //       minChunks: 2,
    //     },
    //   },
    // },
    minimizer: [
      new TerserPlugin({
        parallel: false,
      }),
    ]
  },
};

module.exports = merge(baseConfig, prodConfig);
