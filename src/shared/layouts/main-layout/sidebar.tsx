import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavLink as NavLinkMantine } from '@mantine/core'

import { sidebarLinks } from './sidebar-links'

export const Sidebar = () => {
  const { t } = useTranslation('main')

  return (
    <div>
      {sidebarLinks.map(({ id, label, link }) => (
        <NavLink
          key={id}
          to={link}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {({ isActive }) => (
            <NavLinkMantine
              active={isActive}
              component="span"
              label={t(label)}
            />
          )}
        </NavLink>
      ))}
    </div>
  )
}
