import { Select, SelectProps } from '@mantine/core'
import { useFetchProductLanguagesList } from '../queries/product-languages-queries'

interface ProductLanguagesList extends SelectProps {}

export const ProductLanguagesList = (props: ProductLanguagesList) => {
  const { data: productLanguagesList } = useFetchProductLanguagesList()

  const selectData = productLanguagesList?.data.map((item) => {
    return {
      label: item.name,
      value: item.id.toString(),
    }
  })

  return <Select data={selectData} {...props} />
}
