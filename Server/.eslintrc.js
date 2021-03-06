module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': 0,
    'object-curly-newline': 0,
    'no-console': 0,
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
  },
};
