import { withLangs } from '@/features/languages/hoc/with-languages'
import { initLanguages } from '@/features/languages/lib/init-languages'
import { Language } from '@/features/languages/types/language'
import { isNotEmpty, useForm } from '@mantine/form'
import { HTTPError } from '@/shared/types/http'
import { Stack, TextInput, Text, Group, Button } from '@mantine/core'
import { CompanyBody } from '../types/company'

const initialData = (languages: Language[]) => {
  return {
    name: initLanguages(languages, ''),
  }
}

interface CompanyFormProps {
  initialValues?: CompanyBody
  submitFn: (body: CompanyBody) => Promise<unknown>
  loading: boolean
  submitTitle: string
}

export const CompanyForm = withLangs<CompanyFormProps>(
  ({
    languages,
    initialValues = initialData(languages),
    submitFn,
    loading,
    submitTitle,
  }) => {
    const form = useForm<CompanyBody>({
      initialValues,
      validate: {
        name: initLanguages(languages, isNotEmpty('Обязательное поле')),
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
          {languages.length > 0 ? (
            languages.map((language) => {
              return (
                <TextInput
                  key={language.id}
                  label={`Наименование ${language.locale}`}
                  withAsterisk
                  data-autofocus
                  {...form.getInputProps(`name.${language.locale}`)}
                />
              )
            })
          ) : (
            <div>
              <Text>Вы не добавили язык</Text>
            </div>
          )}
        </Stack>

        <Group justify="flex-end" mt="lg">
          <Button type="submit" disabled={!form.isDirty()} loading={loading}>
            {submitTitle}
          </Button>
        </Group>
      </form>
    )
  }
)
