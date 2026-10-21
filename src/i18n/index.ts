import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import fr from './locales/fr.json'

export const resources = {
  fr: { translation: fr },
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'fr',
  supportedLngs: ['fr'],
  // React échappe déjà les textes : pas besoin de le faire deux fois
  interpolation: { escapeValue: false },
})

export default i18n
