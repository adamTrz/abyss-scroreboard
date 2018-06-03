module.exports = {
  extends: 'callstack-io',
  globals: {
    __DEV__: true,
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'import/first': 0,
    'flowtype/no-weak-types': 0,
    'no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    'flowtype/require-valid-file-annotation': [2, 'always'],
  },
  env: {
    jest: true,
  },
};
