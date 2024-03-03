import { withLangs } from '@/features/languages/hoc/with-languages'

import { Language } from '@/features/languages/types/language'
import { initLanguages } from '@/features/languages/lib/init-languages'
import { isNotEmpty, useForm } from '@mantine/form'
import { HTTPError } from '@/shared/types/http'
import { Stack, TextInput, Text, Group, Button } from '@mantine/core'
import { CategoryBody } from '../types/categories'
import { notifications } from '@mantine/notifications'

const initialData = (languages: Language[]) => {
  return {
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
        notifications.show({
          title: 'Ошибка',
          message: err.message,
          color: 'red',
        })
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
