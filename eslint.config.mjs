// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    '_docs',
    'public',
    'src/assets',
    'dist',
    'node_modules',
    'fakeServer',
    '**/*.md',
    'eslint.config.mjs'
  ]
},
{
  rules: {
    'antfu/if-newline': 'off',
    'antfu/consistent-list-newline': 'off',
    'jsonc/sort-keys': 'off',
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': 'off',
    // https://eslint.org/docs/latest/rules/sort-imports
    'sort-imports': 'off',
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/process.md
    'n/prefer-global/process': ['error', 'always'],
    // https://eslint.style/rules/default/comma-dangle
    'style/comma-dangle': ['error', 'only-multiline'],
    // https://eslint.style/rules/default/brace-style
    'style/brace-style': 'off',
    // https://eslint.vuejs.org/rules/first-attribute-linebreak
    'vue/first-attribute-linebreak': ['error', {
      'singleline': 'ignore',
      'multiline': 'below'
    }],
    // https://eslint.vuejs.org/rules/html-closing-bracket-newline.html
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always',
      'selfClosingTag': {
        'singleline': 'never',
        'multiline': 'always'
      }
    }],
    // https://eslint.vuejs.org/rules/html-indent.html
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'baseIndent': 1,
      'closeBracket': 0,
      'alignAttributesVertically': true,
      'ignores': []
    }],
    // https://eslint.vuejs.org/rules/no-useless-v-bind.html
    'vue/no-useless-v-bind': ['error', {
      'ignoreIncludesComment': false,
      'ignoreStringEscape': true
    }],
    // https://eslint.vuejs.org/rules/component-definition-name-casing.html
    'vue/component-definition-name-casing': 'off',
    // https://eslint.vuejs.org/rules/no-useless-v-bind.html
    'vue/no-useless-v-bind': 'off',
    // https://eslint.vuejs.org/rules/component-name-in-template-casing.html
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    // https://eslint.vuejs.org/rules/singleline-html-element-content-newline
    "vue/singleline-html-element-content-newline": 'off',
  },
})
