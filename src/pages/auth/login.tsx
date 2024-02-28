import { LoginForm } from '@/features/auth/ui/login-form'
import { Title } from '@mantine/core'

const LoginPage = () => {
  return (
    <>
      <Title order={2} ta={'center'} mb="md">
        Вход
      </Title>

      <LoginForm />
    </>
  )
}

export default LoginPage
