import { ComponentType } from 'react'
import { Language } from '../types/language'
import { useFetchListLanguages } from '../queries/languages-queries'
import { Center, Loader } from '@mantine/core'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'

interface WithLanguagesProps {
  languages: Language[]
}

export const withLangs = <T,>(
  Component: ComponentType<T & WithLanguagesProps>
) => {
  const displayName = Component.displayName || 'Component'

  const ComponentWithLanguages = (props: T) => {
    const {
      data: languages,
      isFetching,
      isError,
      isSuccess,
    } = useFetchListLanguages()

    if (isFetching)
      return (
        <Center>
          <Loader />
        </Center>
      )
    if (isError) return <ErrorAlert message={'Ошибка при загрузке языков'} />
    if (isSuccess) return <Component {...props} languages={languages.data} />
  }

  ComponentWithLanguages.displayName = `withLanguages(${displayName})`

  return ComponentWithLanguages
}
