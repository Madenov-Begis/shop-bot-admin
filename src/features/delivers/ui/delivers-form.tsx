import { HTTPError } from '@/shared/types/http'
import { Button, Group, Stack, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { DeliversBody } from '../types/delivers'

const initialData = {
  name: '',
  in_tashkent: '',
  in_uzbekistan: '',
}

interface DeliversFormProps {
  initialValues?: DeliversBody
  submitFn: (body: DeliversBody) => Promise<unknown>
  loading: boolean
  submitTitle: string
}

export const DeliversForm = ({
  initialValues = initialData,
  submitFn,
  loading,
  submitTitle,
}: DeliversFormProps) => {
  const form = useForm<DeliversBody>({
    initialValues,
    validate: {
      name: isNotEmpty('Обязательное поле'),
      in_tashkent: isNotEmpty('Обязательное поле'),
      in_uzbekistan: isNotEmpty('Обязательное поле'),
    },
  })

  const handleSubmit = async (data: typeof form.values) => {
    try {
      await submitFn(data)
      form.reset()
    } catch (error) {
      const err = error as HTTPError
      if (err.errors) {
        form.setErrors(err.errors)
      }
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={`Название`}
          withAsterisk
          data-autofocus
          {...form.getInputProps(`name`)}
        />
        <TextInput
          label={`По Ташкенту`}
          withAsterisk
          data-autofocus
          {...form.getInputProps(`in_tashkent`)}
        />
        <TextInput
          label={`По всему Узбекистану`}
          withAsterisk
          data-autofocus
          {...form.getInputProps(`in_uzbekistan`)}
        />
      </Stack>

      <Group justify="flex-end" mt="lg">
        <Button type="submit" disabled={!form.isDirty()} loading={loading}>
          {submitTitle}
        </Button>
      </Group>
    </form>
  )
}
