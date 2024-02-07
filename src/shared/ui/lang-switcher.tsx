import { ActionIcon, Menu } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../constants/languages'
import { IconLanguage } from '@tabler/icons-react'

export const LangSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  console.log(i18n)

  console.log(i18n.resolvedLanguage)

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon size="lg" variant="default">
          <IconLanguage />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {Object.entries(LANGUAGES).map(([key, value]) => {
          return (
            <Menu.Item onClick={() => changeLanguage(key)} key={key}>
              {value}
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
