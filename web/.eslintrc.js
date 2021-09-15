const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  env: {
    browser: true,
  },

  parserOptions: {
    ecmaVersion: 2021,
  },

  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:react/recommended'],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'import/no-unresolved': 0,
    'import/prefer-default-export': 'off',
    'no-param-reassign': 0,
    'no-console': 0,
    'no-use-before-define': 0,
    'no-unused-vars': 'warn',
    'react/display-name': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
