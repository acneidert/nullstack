function devtool(options) {
  if (options.environment === 'development') {
    if (disk) {
      return 'inline-cheap-module-source-map'
    } 
    return 'eval-cheap-module-source-map'
  } else {
    return 'hidden-source-map'
  }
}

module.exports = devtool