import { modals } from '@mantine/modals'
import {
  useFetchPublisher,
  useUpdatePublisher,
} from '../queries/publishers-queries'
import { PublisherBody } from '../types/publishers'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { Center, Loader } from '@mantine/core'
import { PublisherForm } from './publisher-form'

export const UpdatePublisher = ({ publisherId }: { publisherId: number }) => {
  const {
    data: publisher,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useFetchPublisher(publisherId)

  const updateMutation = useUpdatePublisher()

  const handleSubmit = async (body: PublisherBody) => {
    try {
      await updateMutation.mutateAsync({ publisherId: publisherId, body })
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

      {isSuccess && !isFetching && (
        <>
          {updateMutation.isError && !updateMutation.error.errors && (
            <ErrorAlert message={updateMutation.error.message} mb="md" />
          )}

          <PublisherForm
            initialValues={publisher.data}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
          />
        </>
      )}
    </>
  )
}
