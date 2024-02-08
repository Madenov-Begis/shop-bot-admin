import { modals } from '@mantine/modals'

import { ChashbackForm } from './chashback-form'
import { useCreateCashback } from '../queries/cashback-queries'
import { CashbackBody } from '../types/cashbacks'

import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'

export const CreateCashback = () => {
  const createMutation = useCreateCashback()

  const handleSubmit = async (body: CashbackBody) => {
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

      <ChashbackForm
        submitFn={handleSubmit}
        loading={createMutation.isPending}
        submitTitle="Добавить"
      />
    </>
  )
}
