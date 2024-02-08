import { Button, Group, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { LanguageBody } from '../types/language'
import { HTTPError } from '@/shared/types/http'

const initialData: LanguageBody = {
  locale: '',
  name: '',
}

interface LanguageFormProps {
  submitFn: (body: LanguageBody) => Promise<unknown>
  initialValues?: LanguageBody
  submitTitle: string
  loading: boolean
}

export const LanguageForm = (props: LanguageFormProps) => {
  const { submitFn, initialValues = initialData, submitTitle, loading } = props

  const form = useForm<LanguageBody>({
    initialValues,
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
          label="Название"
          withAsterisk
          data-autofocus
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Locale"
          withAsterisk
          {...form.getInputProps('locale')}
        />
      </Stack>

      <Group justify="flex-end" mt="lg">
        <Button type="submit" loading={loading} disabled={!form.isDirty()}>
          {submitTitle}
        </Button>
      </Group>
    </form>
  )
}
