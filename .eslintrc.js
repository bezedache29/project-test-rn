module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:@tanstack/query/recommended'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'warn',
    // Les headerRight de React Navigation sont des fonctions de rendu, pas des composants
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
  },
  overrides: [
    {
      files: ['jest.setup.js', '__mocks__/**'],
      env: { jest: true },
    },
  ],
}
