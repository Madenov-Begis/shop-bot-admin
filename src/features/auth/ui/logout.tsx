import { Button, Text } from '@mantine/core'
import { useAuth } from '../auth-context/auth-context'
import { modals } from '@mantine/modals'

export const Logout = () => {
  const { logout } = useAuth()

  const handleLogout = () => {
    modals.openConfirmModal({
      title: 'Подтвердите действие',
      children: <Text size="sm">Вы действительно хотите выйти?</Text>,
      labels: { confirm: 'Подтвердить', cancel: 'Отмена' },
      onConfirm: logout,
    })
  }

  return <Button onClick={handleLogout}>Выйти</Button>
}
