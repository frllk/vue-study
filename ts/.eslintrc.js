module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 'off',
    'prefer-const': 'off',
    "@typescript-eslint/no-empty-function": "off", // 允许空函数
    "@typescript-eslint/no-explicit-any": "off",
    // "@typescript-eslint/member-delimiter-style": ["error", {
    //   multiline: {
    //     delimiter: 'none',
    //     requireLast: true,
    //   },
    //   singleline: {
    //     delimiter: 'none',
    //     requireLast: false,
    //   },
    // }],
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: {
        delimiter: 'none',    // 'none' or 'semi' or 'comma'
        requireLast: false,
      },
      singleline: {
        delimiter: 'semi',    // 'semi' or 'comma'
        requireLast: false,
      },
    }],
    'space-before-function-paren': ['error', {
      // anonymous: 'always', // https://eslint.org/docs/rules/space-before-function-paren#require-or-disallow-a-space-before-function-parenthesis-space-before-function-paren
      named: 'never',
      // asyncArrow: 'always'
    }],
    "no-useless-constructor": "off"
  }
}
