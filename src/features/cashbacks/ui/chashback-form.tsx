import {
  Alert,
  Button,
  Group,
  Loader,
  NumberInput,
  TextInput,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { CashbackBody } from '../types/cashbacks'
import { HTTPError } from '@/config/http/types'
import { useFetchLanguages } from '@/config/languages/languages-query'
import { LangsType } from '@/config/languages/types'
// import { langs } from '@/config/i18n/langs'
import { ComponentType } from 'react'

interface CashbacksFormProps extends WithLanguagesProps {
  data?: CashbackBody
  submitFunc: (data: CashbackBody) => Promise<unknown>
}

const initialValues = (langs: LangsType[]) => {
  return {
    name: {
      ...langs?.reduce((acc, lang) => {
        return {
          ...acc,
          [lang.locale]: '',
        }
      }, {}),
    },
    percentage: null,
  }
}

const ChashbackForm = ({ submitFunc, data, langs }: CashbacksFormProps) => {
  // console.log(data)

  const form = useForm<CashbackBody>({
    initialValues: data || initialValues(langs!),
    validate: {
      name: {
        ru: isNotEmpty('Обязательное поле'),
        uz: isNotEmpty('Обязательное поле'),
      },
      percentage: isNotEmpty('Обязательное поле'),
    },
  })

  console.log(form.values)
  console.log(langs, 'langs')

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
      {langs!.map((lang) => {
        return (
          <TextInput
            key={lang.id}
            label={`Наименование ${lang.name}`}
            withAsterisk
            {...form.getInputProps(`name.${lang.locale}`)}
            data-autofocus
          />
        )
      })}

      <NumberInput
        label={'Процент'}
        withAsterisk
        {...form.getInputProps('percentage')}
        data-autofocus
        clampBehavior="strict"
        min={1}
        max={100}
        allowNegative={false}
      />

      <Group justify="flex-end" mt="lg">
        <Button type="submit">Добавить</Button>
      </Group>
    </form>
  )
}

interface WithLanguagesProps {
  langs?: LangsType[]
}

const withLangs = <T extends WithLanguagesProps = WithLanguagesProps>(
  Component: ComponentType<T>
) => {
  const displayName = Component.displayName || 'Component'

  const ComponentWithLanguages = (props: Omit<T, keyof WithLanguagesProps>) => {
    const {
      data: languages,
      isLoading,
      isError,
      isSuccess,
    } = useFetchLanguages()

    if (isLoading) return <Loader />
    if (isError)
      return (
        <Alert color="red" title="Ошибка">
          Не удалось загрузить языки
        </Alert>
      )
    if (isSuccess) return <Component {...(props as T)} langs={languages.data} />
  }

  ComponentWithLanguages.displayName = `withLanguages(${displayName})`

  return ComponentWithLanguages
}

export const ChashbackFormWithLangs = withLangs(ChashbackForm)
