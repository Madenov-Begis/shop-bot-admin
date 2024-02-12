import { withLangs } from '@/features/languages/hoc/with-languages'
import { initLanguages } from '@/features/languages/lib/init-languages'
import { Language } from '@/features/languages/types/language'
import { isNotEmpty, useForm } from '@mantine/form'
import { CategoryBody } from '../types/category'
import { HTTPError } from '@/shared/types/http'
import { Stack, TextInput, Text, Group, Button } from '@mantine/core'
import { CategoriesSelect } from './categories-select'

const initialData = (languages: Language[]) => {
  return {
    parent_id: null,
    name: initLanguages(languages, ''),
  }
}

interface CategoryFormProps {
  initialValues?: CategoryBody
  submitFn: (body: CategoryBody) => Promise<unknown>
  loading: boolean
  submitTitle: string
}

export const CategoryForm = withLangs<CategoryFormProps>(
  ({
    languages,
    initialValues = initialData(languages),
    submitFn,
    loading,
    submitTitle,
  }) => {
    const form = useForm<CategoryBody>({
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
        <CategoriesSelect
          label="Родительская дата"
          value={initialValues.parent_id}
          {...form.getInputProps(`parent_id`)}
        />

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
