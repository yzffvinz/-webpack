if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/vinz-two-sum.min.js');
} else {
  module.exports = require('./dist/vinz-two-sum.js');
}
