module.exports = {
  root: true,
  extends: 'eslint:recommended',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 11,
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  globals: {
    wx: 'readonly',
    mqq: 'readonly',
    window: true,
  },
  rules: {
    // semi: ['error', 'never'],
    quotes: ['error', 'single'],
  },
  plugins: ['html'],
}
