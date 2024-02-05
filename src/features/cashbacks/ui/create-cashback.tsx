import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { ChashbackFormWithLangs } from './chashback-form'
import { useCreateCashback } from '../queries/cashback-queries'
import { CashbackBody } from '../types/cashbacks'

export const CreateCashback = () => {
  const create = useCreateCashback()

  const submitFunc = async (data: CashbackBody) => {
    try {
      await create.mutateAsync(data)

      modals.closeAll()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <Button
      onClick={() =>
        modals.open({
          children: <ChashbackFormWithLangs submitFunc={submitFunc} />,
        })
      }
    >
      Добавить
    </Button>
  )
}
