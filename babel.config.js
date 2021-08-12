module.exports = (api) => {
  const { BABEL_MODULE, RUN_ENV, NODE_ENV } = process.env
  const useESModules =
    BABEL_MODULE !== 'commonjs' && RUN_ENV !== 'PRODUCTION' && NODE_ENV !== 'test'

  api && api.cache(false)

  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          modules: useESModules ? false : 'commonjs',
          useBuiltIns: false,
          // corejs: 3
        },
      ],
      ['@babel/typescript'],
    ],
    plugins: [[require.resolve('@babel/plugin-transform-runtime'), { useESModules }]],
  }
}
