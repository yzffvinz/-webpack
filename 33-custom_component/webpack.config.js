const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    'vinz-two-sum': './src/index.js',
    'vinz-two-sum.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'vinzTwoSum',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\min                                                                                                                                                                                            .js(\?.*)?$/i,
      }),
    ]
  }
}
