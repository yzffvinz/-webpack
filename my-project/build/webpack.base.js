const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index/index.js',
    search: './src/search/search.js'
  },
  output: {
    filename: '[name].js'
  }
}
