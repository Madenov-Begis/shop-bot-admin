import { Button, Group, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { AudienceBody } from '../types/audience'
import { HTTPError } from '@/config/http/types'

interface UpdateFromProps {
  initialValues?: AudienceBody
  audienceId?: number
  submitFunc: (data: AudienceBody) => Promise<unknown>
}

const initialSate: AudienceBody = {
  age: '',
}

export const AudineceForm = ({
  initialValues = initialSate,
  submitFunc,
}: UpdateFromProps) => {
  const form = useForm<AudienceBody>({
    initialValues,
    validate: {
      age: isNotEmpty('Обязательное поле'),
    },
  })

  const handleSubmit = async (data: typeof form.values) => {
    try {
      await submitFunc(data)
    } catch (error) {
      const err = error as HTTPError

      if (err.errors) {
        form.setErrors(err.errors)
      }
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label={'Возрастное ограничение'}
        withAsterisk
        {...form.getInputProps('age')}
        data-autofocus
      />
      <Group justify="flex-end" mt="lg">
        <Button type="submit">Добавить</Button>
      </Group>
    </form>
  )
}
