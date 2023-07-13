/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  // parser: 'vue-eslint-parser',
  // parserOptions: {
  //   ecmaVersion: 2020,
  //   sourceType: 'module',
  // },
  parserOptions: {
    ecmaVersion: 'latest',
  },
}