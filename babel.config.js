const { replaceVersionPlugin } = require('./babel.plugin.js')
const masterVersion = require('./package.json').version
console.log(['masterVersion'], masterVersion)

module.exports = (api) => {
  const { BABEL_MODULE, RUN_ENV, NODE_ENV } = process.env
  const useESModules =
    BABEL_MODULE !== 'commonjs' && RUN_ENV !== 'PRODUCTION' && NODE_ENV !== 'test'

  api && api.cache(false)

  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        Object.assign(
          {},
          useESModules
            ? {
                modules: false,
                useBuiltIns: false,
              }
            : {
                modules: 'commonjs',
                useBuiltIns: 'usage',
                corejs: 3,
              }
        ),
      ],
      ['@babel/typescript'],
    ],
    plugins: [
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          useESModules,
        },
      ],
      [
        replaceVersionPlugin,
        {
          __VERSION__: masterVersion,
        },
      ],
    ],
  }
}
