import {
  AppShell,
  Burger,
  Flex,
  Group,
  Text,
  NavLink,
  Loader,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LangSwitcher } from '../../config/ui'
import { Suspense } from 'react'

function MainLayout() {
  const { t } = useTranslation()

  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text size="25px" fw={700}>
            E-OBUNA
          </Text>
          <Flex>
            <LangSwitcher />
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          href="/audiences"
          label={t('audience')}
          bg="#e6e6e6"
          fw={600}
          fz={'lg'}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  )
}

export default MainLayout
