import { CategoryList } from '@/features/categories/ui/category-list'
import { Createcategory } from '@/features/categories/ui/create-category'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'

const CategoryPage = () => {
  const onClick = () => {
    modals.open({
      title: 'Создание',
      children: <Createcategory />
    })
  }

  return (
    <>
      <PageHead
        title="Категория"
        renderButton={<Button onClick={onClick}>Создать</Button>}
      />

      <CategoryList />
    </>
  )
}

export default CategoryPage
