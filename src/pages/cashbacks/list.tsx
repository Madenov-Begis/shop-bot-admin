import { Button } from '@mantine/core'
import { CashbacksList } from '@/features/cashbacks/ui/cashbacks-list'

import { PageHead } from '@/shared/ui/page-head/page-head'
import { modals } from '@mantine/modals'
import { CreateCashback } from '@/features/cashbacks/ui/create-cashback'

const CashbacksPage = () => {
  const handleCreate = () => {
    modals.open({
      title: 'Добавление кэшбека',
      children: <CreateCashback />,
    })
  }

  return (
    <>
      <PageHead
        title="Кэшбеки"
        renderButton={<Button onClick={handleCreate}>Добавить</Button>}
      />
      <CashbacksList />
    </>
  )
}

export default CashbacksPage
