import {
  AppShell,
  Burger,
  Flex,
  Group,
  Text,
  NavLink,
  Loader,
  Center,
  Button,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LangSwitcher } from '../../config/ui'
import { Suspense } from 'react'
import { modals } from '@mantine/modals'
import { useAuth } from '@/features/auth/auth-context/use-auth'

function MainLayout() {
  const { t } = useTranslation()

  const [opened, { toggle }] = useDisclosure()

  const { logout } = useAuth()

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
          <Flex gap="md">
            <LangSwitcher />
            <Button
              onClick={() => {
                modals.openConfirmModal({
                  children: <div>Вы действительно хотите выйти?</div>,
                  labels: { confirm: 'Да', cancel: 'Отмена' },
                  onConfirm: () => logout(),
                })
              }}
            >
              Выйти
            </Button>
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          to="/audiences"
          label={t('audience')}
          bg="#e6e6e6"
          fw={600}
          fz={'lg'}
          mb={'md'}
          component={Link}
        />
        <NavLink
          to="/cashbacks"
          label={'Кэшбеки'}
          bg="#e6e6e6"
          fw={600}
          fz={'lg'}
          mb={'md'}
          component={Link}
        />
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

export default MainLayout
