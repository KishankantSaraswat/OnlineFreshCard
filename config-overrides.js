const { override, addBabelPlugin } = require('customize-cra')

module.exports = override(
  addBabelPlugin('@babel/plugin-proposal-class-properties')
) 