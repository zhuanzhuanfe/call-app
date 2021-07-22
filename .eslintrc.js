module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:import/typescript', 'plugin:unicorn/recommended', 'prettier'],
  plugins: ['html', 'prettier', 'unicorn'],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    wx: 'readonly',
    mqq: 'readonly',
    window: true,
  },
  rules: {
    // 'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'no-plusplus': 'off',
    'import/no-extraneous-dependencies': ['error', { peerDependencies: true }],
    'prettier/prettier': 'error',
    'unicorn/prefer-includes': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-param-reassign': 'off',
        // airbnb 配置导致 tsx 文件引用一直报错
        'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
      },
    },
  ],
}
