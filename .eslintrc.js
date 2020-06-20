module.exports = {
  root: true,
  env: {
    es6:true,
  },
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures:{
      jsx:true,
    },
    ecmaVersion:2018,
    sourceType:'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/prefer-default-export' : 'off'
  }
};
