import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

export const languages = {
  ru: 'Русский',
  uz: 'O‘zbekcha',
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: {
          audience: 'Возрастное ограничение',
        },
      },
      uz: {
        translation: {
          audience: 'Yosh toifalar',
        },
      },
    },
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
