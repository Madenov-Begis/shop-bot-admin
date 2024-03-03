import { nanoid } from 'nanoid'
import { ROUTES } from '@/shared/constants/routes'

type SidebarLink = {
  id: string
  link: string
  label: string
}

export const sidebarLinks: SidebarLink[] = [
  {
    id: nanoid(),
    link: ROUTES.HOME,
    label: 'Главная',
  },
  {
    id: nanoid(),
    link: ROUTES.PRODUCTS,
    label: 'Продукты',
  },
  {
    id: nanoid(),
    link: ROUTES.CATEGORIES,
    label: 'Категории',
  },

  // {
  //   id: nanoid(),
  //   link: ROUTES.CASHBACKS,
  //   label: 'Кешбэк',
  // },
  // {
  //   id: nanoid(),
  //   link: ROUTES.CATALOGS,
  //   label: 'Каталог',
  // },

  {
    id: nanoid(),
    link: ROUTES.LANGUAGES,
    label: 'Языки',
  },
]
