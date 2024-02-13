import { CreatePublisher } from '@/features/publishers/ui/create-publisher'
import { PublisherList } from '@/features/publishers/ui/publisher-list'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'

const PublishersPage = () => {
  const handleCreate = () => {
    modals.open({
      title: 'Создание издании',
      children: <CreatePublisher />,
    })
  }

  return (
    <>
      <PageHead
        title="Издания"
        renderButton={<Button onClick={handleCreate}>Добавить</Button>}
      />

      <PublisherList />
    </>
  )
}

export default PublishersPage
