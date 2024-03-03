import { Center, Loader } from '@mantine/core'
import { modals } from '@mantine/modals'

import { LanguageForm } from './language-form'
import {
  useFetchLanguage,
  useUpdateLanguage,
} from '../queries/languages-queries'
import { LanguageBody } from '../types/language'

import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'

interface EditLanguageProps {
  languageId: number
}

export const EditLanguage = (props: EditLanguageProps) => {
  const {
    data: language,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useFetchLanguage(props.languageId)
  const updateMutation = useUpdateLanguage()

  const handleSubmit = async (body: LanguageBody) => {
    try {
      await updateMutation.mutateAsync({ languageId: props.languageId, body })
      modals.closeAll()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <>
      {isError && <ErrorAlert message={error.message} />}

      {isFetching && (
        <Center>
          <Loader />
        </Center>
      )}

      {isSuccess && (
        <>
          {updateMutation.isError && (
            <ErrorAlert message={updateMutation.error.message} mb="md" />
          )}

          <LanguageForm
            initialValues={{locale: language.locale, name: language.name}}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
          />
        </>
      )}
    </>
  )
}
