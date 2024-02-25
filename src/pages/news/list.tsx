import { NewsList } from '@/features/news/ui/news-list'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const NewsPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <PageHead
        title="Новости"
        renderButton={<Button onClick={() => navigate('')}>Добавить</Button>}
      />
      <NewsList />
    </>
  )
}

export default NewsPage
