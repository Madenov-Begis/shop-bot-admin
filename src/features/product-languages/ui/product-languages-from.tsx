import { withLangs } from '@/features/languages/hoc/with-languages'
import { initLanguages } from '@/features/languages/lib/init-languages'
import { Language } from '@/features/languages/types/language'
import { ProductLanguagesBody } from '../types/product-languages'
import { isNotEmpty, useForm } from '@mantine/form'
import { HTTPError } from '@/shared/types/http'
import { Stack, TextInput, Text, Group, Button } from '@mantine/core'

const initialData = (languages: Language[]) => {
  return {
    name: initLanguages(languages, ''),
  }
}

interface ProductLanguagesFormProps {
  initialValues?: ProductLanguagesBody
  submitFn: (body: ProductLanguagesBody) => Promise<unknown>
  loading: boolean
  submitTitle: string
}

export const ProductLanguagesForm = withLangs<ProductLanguagesFormProps>(
  ({
    languages,
    initialValues = initialData(languages),
    submitFn,
    loading,
    submitTitle,
  }) => {
    const form = useForm<ProductLanguagesBody>({
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
