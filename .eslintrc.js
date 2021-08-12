module.exports = {
  extends: [
    'airbnb-base',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // 末尾不加分号，只有在有可能语法错误时才会加分号
    semi: 0,
    '@typescript-eslint/semi': 0,
    // 箭头函数需要有括号 (a) => {}
    'arrow-parens': 0,
    'no-use-before-define': 0,
    // 关闭不允许回调未定义的变量
    'standard/no-callback-literal': 0,
    // 关闭副作用的 new
    'no-new': 'off',
    // 关闭每行最大长度小于 80
    'max-len': 0,
    // 函数括号前面不加空格
    // 关闭要求 require() 出现在顶层模块作用域中
    'global-require': 0,
    // 关闭关闭类方法中必须使用this
    'class-methods-use-this': 0,
    // 关闭禁止对原生对象或只读的全局对象进行赋值
    'no-global-assign': 0,
    // 关闭禁止对关系运算符的左操作数使用否定操作符
    'no-unsafe-negation': 0,
    // 关闭禁止使用 console
    'no-console': 0,
    // 关闭禁止末尾空行
    'eol-last': 0,
    // 关闭强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': 0,
    // 关闭禁止对 function 的参数进行重新赋值
    'no-param-reassign': 0,
    // 强制使用一致的换行符风格 (linebreak-style)
    'linebreak-style': ['error', 'unix'],
    // 关闭全等 === 校验
    eqeqeq: 0,
    // 禁止使用拖尾逗号（即末尾不加逗号）
    'comma-dangle': 0,
    // 关闭强制使用骆驼拼写法命名约定
    camelcase: 1,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'consistent-return': 0,
    'no-plusplus': 0,
    'no-restricted-globals': 0,
    'prefer-promise-reject-errors': 0,
    'prefer-destructuring': 0,
    'prefer-const': 0,
    'no-unused-expressions': 1,
    'space-before-function-paren': 1,
    '@typescript-eslint/no-empty-function': 0,
    'no-shadow': 1,
    'no-underscore-dangle': 0,
    'no-bitwise': 0,
    'import/prefer-default-export': 1,
    '@typescript-eslint/no-extra-semi': 1,
    'no-multi-assign': 1,
  },
}
