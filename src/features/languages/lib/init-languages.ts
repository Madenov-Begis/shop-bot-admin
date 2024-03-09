import { Language } from '../types/language'

export const initLanguages = (langs: Language[], b: unknown) => {
  return {
    ...langs.reduce((acc, language) => {
      return { ...acc, [language.locale]: b }
    }, {}),
  }
}
