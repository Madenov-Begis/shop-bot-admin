import { Button } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export const LangSwitcher = () => {
  const { i18n } = useTranslation()

  // const langs = [
  //   { lang: 'uz', title: 'O‘zbekcha' },
  //   { lang: 'ru', title: 'Русский' },
  // ]
  // console.log(i18n)

  return (
    // <Menu>
    //   <Menu.Target>
    <Button onClick={() => i18n.changeLanguage('ru')}>
      {i18n.resolvedLanguage === 'ru' ? 'Русский' : 'O‘zbekcha'}
    </Button>
    //   </Menu.Target>
    //   <Menu.Dropdown>
    //     {langs.map((item) => (
    //       <Menu.Item
    //         key={item.lang}
    //         onClick={() => {
    //           console.log(i18n.i18n.changeLanguage('ru'))

    //           //   i18n.changeLanguage(i18n.resolvedLanguage === 'uz' ? 'ru' : 'uz')
    //         }}
    //       >
    //         {item.title}
    //       </Menu.Item>
    //     ))}
    //   </Menu.Dropdown>
    // </Menu>
  )
}
