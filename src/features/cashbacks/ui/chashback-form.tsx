import {
  Button,
  Group,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { CashbackBody } from '../types/cashbacks'
import { HTTPError } from '@/shared/types/http'
import { Language } from '@/features/languages/types/language'
import { initLanguages } from '@/features/languages/lib/init-languages'
import { withLangs } from '@/features/languages/hoc/with-languages'

const initialData = (languages: Language[]) => {
  return {
    name: initLanguages(languages, ''),
    percentage: undefined,
  }
}

interface CashbacksFormProps {
  initialValues?: CashbackBody
  submitFn: (body: CashbackBody) => Promise<unknown>
  loading: boolean
  submitTitle: string
}

export const ChashbackForm = withLangs<CashbacksFormProps>(
  ({
    languages,
    initialValues = initialData(languages),
    submitFn,
    loading,
    submitTitle,
  }) => {
    const form = useForm<CashbackBody>({
      initialValues,
      validate: {
        name: initLanguages(languages, isNotEmpty('Обязательное поле')),
        percentage: isNotEmpty('Обязательное поле'),
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

          <NumberInput
            label={'Процент'}
            withAsterisk
            clampBehavior="strict"
            min={1}
            max={100}
            allowNegative={false}
            suffix="%"
            hideControls
            {...form.getInputProps('percentage')}
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
)
