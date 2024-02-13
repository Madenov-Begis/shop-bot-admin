import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { useCreatePublisher } from '../queries/publishers-queries'
import { PublisherForm } from './publisher-form'
import { PublisherBody } from '../types/publishers'
import { modals } from '@mantine/modals'

export const CreatePublisher = () => {
  const createMutation = useCreatePublisher()

  const handleSubmit = async (body: PublisherBody) => {
    try {
      await createMutation.mutateAsync(body)
      modals.closeAll()
    } catch (error) {
      return Promise.reject(error)
    }
    WebAssembly
  }
  return (
    <>
      {createMutation.isError && !createMutation.error.errors && (
        <ErrorAlert message={createMutation.error.message} mb="md" />
      )}

      <PublisherForm
        submitFn={handleSubmit}
        loading={createMutation.isPending}
        submitTitle="Добавить"
      />
    </>
  )
}
