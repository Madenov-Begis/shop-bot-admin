import {
  Alert,
  Box,
  Button,
  Flex,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'

import { PatternFormat } from 'react-number-format'
import { useAuth } from '../auth-context/use-auth'
import { useState } from 'react'
import { HTTPError } from '@/config/http/types'

export const LoginForm = () => {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const form = useForm({
    initialValues: {
      phone: '',
      password: '',
    },
    validate: {
      phone: isNotEmpty('Обязательное поле'),
      password: isNotEmpty('Обязательное поле'),
    },
    transformValues: (values) => {
      return {
        phone: `998${values.phone}`,
        password: values.password,
      }
    },
  })

  const handleSubmit = async (data: typeof form.values) => {
    setIsLoading(true)

    login(data)
      .catch((error) => {
        const err = error as HTTPError

        if (err.errors) return form.setErrors(err.errors)

        setError(err.message)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Flex h={'100vh'} justify="center" align={'center'}>
        <Box w={400}>
          <Title order={3} ta={'center'} mb="xl">
            Войти
          </Title>

          {error && (
            <Alert variant="light" color="red" mb="md">
              {error}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <PatternFormat
              withAsterisk
              format="+998 ## ### ## ##"
              mask=" "
              allowEmptyFormatting={true}
              customInput={TextInput}
              label="Номер телефона"
              size="lg"
              mb="lg"
              autoFocus
              {...form.getInputProps('phone')}
              onChange={() => {}}
              onValueChange={(values) => {
                form.setFieldValue('phone', values.value)
              }}
            />
            <PasswordInput
              label="Пароль"
              size="lg"
              withAsterisk
              mb="lg"
              {...form.getInputProps(`password`)}
            />
            <Button
              loading={isLoading}
              type="submit"
              mb="xl"
              size="lg"
              fullWidth
            >
              Войти
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  )
}
