module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest'
    // sourceType: 'module',
    // parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
