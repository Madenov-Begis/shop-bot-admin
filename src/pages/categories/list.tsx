import { CategoriesList } from '@/features/categories/ui/categories-list'
import { CreateCategory } from '@/features/categories/ui/create-category'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'

const CategoriesPage = () => {
  const handleCreate = () => {
    modals.open({
      title: 'Добавление категории',
      children: <CreateCategory />,
    })
  }

  return (
    <>
      <PageHead
        title="Категории"
        renderButton={<Button onClick={handleCreate}>Добавить</Button>}
      />

      <CategoriesList />
    </>
  )
}

export default CategoriesPage
