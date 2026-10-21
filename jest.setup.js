// Mock officiel : fournit des marges de zone sûre fixes pendant les tests
jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default
)

// Vrais textes français dans les tests (pas de mock de react-i18next)
require('@/i18n')
