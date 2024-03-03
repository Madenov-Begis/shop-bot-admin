import { Select, SelectProps } from '@mantine/core'
import { useFetchCategoryList } from '../queries/categories-queries'

interface CategoriesSelect extends SelectProps {}

export const CategoriesSelect = (props: CategoriesSelect) => {
  const { data: categoryList } = useFetchCategoryList()

  const selectData = categoryList?.map((item) => {
    return {
      label: item.ru,
      value: item.id.toString(),
    }
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  return <Select data={selectData} {...props} />
}
