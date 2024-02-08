import { ActionIcon, Menu } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { IconLanguage } from '@tabler/icons-react'
import { languages } from '@/shared/config/languages'

export const LangSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon size="lg" variant="default">
          <IconLanguage />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {Object.entries(languages).map(([key, value]) => {
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
