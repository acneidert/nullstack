const { existsSync } = require('fs')
const path = require('path')

function getOptions(target, options) {
  const disk = !!options.disk;
  const environment = options.environment
  const loader = options.loader || 'swc'
  const entry = existsSync(path.posix.join(process.cwd(), `${target}.ts`)) ? `./${target}.ts` : `./${target}.js`
  const projectFolder = process.cwd()
  const configFolder = __dirname
  const buildFolder = '.' + environment
  return {
    target,
    disk,
    buildFolder,
    loader,
    entry,
    environment,
    projectFolder,
    configFolder
  }
}

function config(platform, argv) {
  const options = getOptions(platform, argv);
  return {
    mode: require('./webpack/mode')(options),
    infrastructureLogging: require('./webpack/infrastructureLogging')(options),
    entry: require('./webpack/entry')(options),
    output: require('./webpack/output')(options),
    resolve: require('./webpack/resolve')(options),
    optimization: require('./webpack/optimization')(options),
    devtool: require('./webpack/devtool')(options),
    stats: require('./webpack/stats')(options),
    target: require('./webpack/target')(options),
    externals: require('./webpack/externals')(options),
    node: require('./webpack/node')(options),
    cache: require('./webpack/cache')(options),
    module: require('./webpack/module')(options),
    plugins: require('./webpack/plugins')(options),
  }
}

function server(_env, argv) {
  return config('server', argv)
}

function client(_env, argv) {
  return config('client', argv)
}

module.exports = [server, client]