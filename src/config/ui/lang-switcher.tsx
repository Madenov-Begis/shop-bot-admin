import { Button } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export const LangSwitcher = () => {
  const { i18n } = useTranslation()

  return (
    <Button
      onClick={() =>
        i18n.changeLanguage(i18n.resolvedLanguage === 'ru' ? 'uz' : 'ru')
      }
    >
      {i18n.resolvedLanguage === 'ru' ? 'Русский' : 'O‘zbekcha'}
    </Button>
  )
}
