import { useState } from 'react'
import { Alert, Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { hasLength, isNotEmpty, useForm } from '@mantine/form'

import { PatternFormat } from 'react-number-format'
import { useAuth } from '../auth-context/auth-context'

import { HTTPError } from '@/shared/types/http'

export const LoginForm = () => {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm({
    initialValues: {
      phone: import.meta.env.VITE_PHONE || '',
      password: import.meta.env.VITE_PASSWORD || '',
    },
    validate: {
      phone: hasLength({ min: 9 }, 'Обязательное поле'),
      password: isNotEmpty('Обязательное поле'),
    },
    transformValues: (values) => {
      return {
        ...values,
        phone: `998${values.phone}`,
      }
    },
  })

  const handleSubmit = async (data: typeof form.values) => {
    setIsLoading(true)
    setError(null)

    try {
      await login(data)
      setIsLoading(false)
    } catch (error) {
      const err = error as HTTPError
      if (err.errors) return form.setErrors(err.errors)
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div>
      {error && (
        <Alert title="Ошибка" variant="light" color="red" mb="md">
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <PatternFormat
            withAsterisk
            format="+998 ## ### ## ##"
            mask=" "
            allowEmptyFormatting={true}
            customInput={TextInput}
            label="Номер телефона"
            autoFocus
            {...form.getInputProps('phone')}
            onValueChange={(values) => {
              form.setFieldValue('phone', values.value)
            }}
            onChange={() => {}}
          />
          <PasswordInput
            label="Пароль"
            withAsterisk
            {...form.getInputProps(`password`)}
          />
        </Stack>
        <Button loading={isLoading} type="submit" fullWidth mt="xl">
          Войти
        </Button>
      </form>
    </div>
  )
}
