import { LoginForm } from '@/features/auth/ui/login-form'
import { Title } from '@mantine/core'

const LoginPage = () => {
  return (
    <>
      <Title order={2} ta={'center'} mb="md">
        Войти
      </Title>

      <LoginForm />
    </>
  )
}

export default LoginPage
