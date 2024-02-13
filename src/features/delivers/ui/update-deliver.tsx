import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { useFetchDeliver, useUpdateDeliver } from '../queries/delivers-queries'
import { Center, Loader } from '@mantine/core'
import { DeliversBody } from '../types/delivers'
import { modals } from '@mantine/modals'
import { DeliversForm } from './delivers-form'

export const UpdateDeliver = ({ deliverId }: { deliverId: number }) => {
  const {
    data: company,
    isFetching,
    error,
    isError,
    isSuccess,
  } = useFetchDeliver(deliverId)

  const updateMutation = useUpdateDeliver()

  const handleSubmit = async (body: DeliversBody) => {
    try {
      await updateMutation.mutateAsync({ deliverId, body })
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

          <DeliversForm
            initialValues={company.data}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
          />
        </>
      )}
    </>
  )
}
