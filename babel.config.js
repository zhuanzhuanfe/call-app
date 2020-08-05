module.exports = api => {
  const { BABEL_MODULE, RUN_ENV, NODE_ENV } = process.env
  const useESModules =
    BABEL_MODULE !== 'commonjs' &&
    RUN_ENV !== 'PRODUCTION' &&
    NODE_ENV !== 'test'

  api.cache(false)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: useESModules ? false : 'commonjs',
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { useESModules }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
  }
}
