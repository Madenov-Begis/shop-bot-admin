import { modals } from '@mantine/modals'
import {
  useShowCashback,
  useUpdateCashback,
} from '../queries/cashback-queries'
import { CashbackBody } from '../types/cashbacks'
import { ChashbackFormWithLangs } from './chashback-form'
import { Alert, Center, Loader } from '@mantine/core'

export const UpdateCashback = ({ id }: { id: number }) => {
  const {
    data: CashbackShow,
    error,
    isSuccess,
    isFetching,
  } = useShowCashback(id)

  const update = useUpdateCashback()

  const submitFunc = async (data: CashbackBody) => {
    try {
      await update.mutateAsync({ body: data, cashbackId: id })

      modals.closeAll()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <>
      {error && (
        <Alert variant="light" color="red">
          {error.message}
        </Alert>
      )}

      {isFetching && (
        <Center>
          <Loader />
        </Center>
      )}

      {isSuccess && !isFetching && (
        <>
          {update.isError && !update.error.errors && (
            <Alert variant="light" color="red">
              {update.error.message}
            </Alert>
          )}
          <ChashbackFormWithLangs data={CashbackShow?.data} submitFunc={submitFunc} />
        </>
      )}
    </>
  )
}
