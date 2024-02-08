import { modals } from '@mantine/modals'

import { LanguageForm } from './language-form'
import { useCreateLanguage } from '../queries/languages-queries'
import { LanguageBody } from '../types/language'

import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'

export const CreateLanguage = () => {
  const createMutation = useCreateLanguage()

  const handleSubmit = async (body: LanguageBody) => {
    try {
      await createMutation.mutateAsync(body)
      modals.closeAll()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <>
      {createMutation.isError && !createMutation.error.errors && (
        <ErrorAlert message={createMutation.error.message} mb="md" />
      )}

      <LanguageForm
        submitFn={handleSubmit}
        loading={createMutation.isPending}
        submitTitle="Добавить"
      />
    </>
  )
}
