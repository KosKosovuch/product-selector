/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended'
  ],

  plugins: ['prettier', '@typescript-eslint'],

  rules: {
    'prettier/prettier': [2],
    'vue/no-multiple-template-root': 0,
    'vue/multi-word-component-names': 0,
    'vue/component-name-in-template-casing': [2, 'PascalCase', { registeredComponentsOnly: false }],
    'vue/html-self-closing': [
      2,
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
