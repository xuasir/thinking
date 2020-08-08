'use strict'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/toolbox.cjs.prod.js')
} else {
  module.exports = require('./dist/toolbox.cjs.js')
}
