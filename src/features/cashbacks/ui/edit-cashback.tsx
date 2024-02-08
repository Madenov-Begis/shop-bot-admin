import { modals } from '@mantine/modals'
import {
  useFetchCashback,
  useUpdateCashback,
} from '../queries/cashback-queries'
import { CashbackBody } from '../types/cashbacks'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { Center, Loader } from '@mantine/core'
import { ChashbackForm } from './chashback-form'

interface EditCashbackProps {
  cashbackId: number
}

export const EditCashback = (props: EditCashbackProps) => {
  const {
    data: cashback,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useFetchCashback(props.cashbackId)
  const updateMutation = useUpdateCashback()

  const handleSubmit = async (body: CashbackBody) => {
    try {
      await updateMutation.mutateAsync({ cashbackId: props.cashbackId, body })
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

          <ChashbackForm
            initialValues={cashback.data}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
          />
        </>
      )}
    </>
  )
}
