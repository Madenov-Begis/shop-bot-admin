import { Select, SelectProps } from '@mantine/core'
import { useFetchCategoryList } from '../queries/categories-queries'

interface CategoriesSelect extends SelectProps {}

export const CategoriesSelect = (props: CategoriesSelect) => {
  const { data: categoryList } = useFetchCategoryList()

  const selectData = categoryList?.data?.map((item) => {
    return {
      label: item.name.ru.toString(),
      value: item.id.toString(),
    }
  })

  return <Select data={selectData} {...props} />
}
