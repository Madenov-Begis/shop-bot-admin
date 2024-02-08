import { Suspense } from 'react'

import { Outlet } from 'react-router-dom'

import {
  AppShell,
  Burger,
  Group,
  Text,
  Loader,
  Center,
  Drawer,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { Logout } from '@/features/auth/ui/logout'
import { Sidebar } from './sidebar'
import { LangSwitcher } from '@/features/languages/ui/lang-switcher'

export const MainLayout = () => {
  const [opened, { close, open }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={open} hiddenFrom="sm" />
          <Text size="xl" visibleFrom="sm">
            E-OBUNA
          </Text>
          <Group>
            <LangSwitcher />
            <Logout />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Drawer size="xs" opened={opened} onClose={close} title="E-OBUNA">
          <Sidebar />
        </Drawer>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Suspense
          fallback={
            <Center>
              <Loader />
            </Center>
          }
        >
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  )
}
