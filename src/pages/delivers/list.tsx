import { CreateDeliver } from '@/features/delivers/ui/create-deliver'
import { DeliversList } from '@/features/delivers/ui/delivers-list'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'

const DeliversPage = () => {
  const handleCreate = () => {
    modals.open({
      title: 'Добавление',
      children: <CreateDeliver />,
    })
  }

  return (
    <>
      <PageHead
        title="Доставка"
        renderButton={<Button onClick={handleCreate}>Добавить</Button>}
      />

      <DeliversList />
    </>
  )
}

export default DeliversPage
