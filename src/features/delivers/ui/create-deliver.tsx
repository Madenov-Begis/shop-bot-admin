import { modals } from '@mantine/modals'
import { useCreateDeliver } from '../queries/delivers-queries'
import { DeliversBody } from '../types/delivers'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { DeliversForm } from './delivers-form'

export const CreateDeliver = () => {
  const createMutation = useCreateDeliver()

  const handleSubmit = async (body: DeliversBody) => {
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

      <DeliversForm
        submitFn={handleSubmit}
        loading={createMutation.isPending}
        submitTitle="Добавить"
      />
    </>
  )
}
