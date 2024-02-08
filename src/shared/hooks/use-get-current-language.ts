import { useTranslation } from 'react-i18next'

export const useGetLanguage = () => {
  const { i18n } = useTranslation()

  return i18n.resolvedLanguage
}
