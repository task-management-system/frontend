module.exports = {
  extends: ['react-app', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/src'],
      },
    },
  },
};
