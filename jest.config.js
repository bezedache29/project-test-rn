module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/jest.setup.js'],
  // Délai max par test porté à 30 s (5 s par défaut). En CI, le cache Jest est vide :
  // le premier test de chaque fichier paie la transformation de tous les modules
  // (React Native, Zod, React Hook Form, lucide) et dépasse les 5 s sans être en échec.
  testTimeout: 30000,
  // lucide-react-native est publié en .mjs, que le preset ne transforme pas
  transform: { '^.+\\.mjs$': 'babel-jest' },
  // Ces paquets sont publiés en code non compilé : Jest doit les transformer
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation/.*|react-native-screens|react-native-safe-area-context|react-native-svg|lucide-react-native|@tanstack/.*|jotai|react-native-mmkv|react-native-nitro-modules)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test-utils/(.*)$': '<rootDir>/test-utils/$1',
  },
}
