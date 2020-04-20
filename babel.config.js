module.exports = (api) => {
  const { BABEL_MODULE, RUN_ENV } = process.env;
  const useESModules = BABEL_MODULE !== 'commonjs' && RUN_ENV !== 'PRODUCTION';

  api.cache(false);

  return {
    presets: [
      ['@babel/preset-env', {
        modules: useESModules ? false : 'commonjs',
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
        useBuiltIns: 'usage',
        corejs: 3
      }]
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { useESModules }],
      ['@babel/plugin-proposal-decorators', { "legacy": true }],
      ['@babel/plugin-proposal-class-properties', { "loose": true }]
    ]
  }
}
