import { Language } from '../types/language'

export const initLanguages = (langs: Language[], b: unknown) => {
  return {
    ...langs.reduce((acc, language) => {
      return { ...acc, [language.locale]: b }
    }, {}),
  }
}

export const initKeys = (langs: Language[], b: unknown, name: string) => {
  return {
    ...langs.reduce((acc, lang) => {
      return { ...acc, [name + '_' + lang.locale]: b }
    }),
  }
}
