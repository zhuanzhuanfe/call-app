module.exports = (modules) => {
  return {
    presets: [
      [require.resolve('babel-preset-env'), {
        modules,
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 8',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
      }],
      require.resolve('babel-preset-stage-2'),
    ],
    plugins: [
      require.resolve('babel-plugin-transform-runtime'),
      require.resolve('babel-plugin-transform-async-to-generator'),
      require.resolve('babel-plugin-transform-object-assign'),
      [require.resolve('babel-plugin-transform-class-properties'),{
        "spec": true
      }],
      require.resolve('babel-plugin-transform-modern-regexp')
    ]
  };
}