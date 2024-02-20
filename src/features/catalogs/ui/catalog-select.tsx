import { Select, SelectProps } from '@mantine/core'
import { useFetchCatalogList } from '../queries/catalog-queries'

interface CatalogsSelect extends SelectProps {}

export const CatalogsSelect = (props: CatalogsSelect) => {
  const { data: catalogsList } = useFetchCatalogList()

  const selectData = catalogsList?.data.map((item) => {
    return {
      label: item.name,
      value: item.id.toString(),
    }
  })

  return <Select data={selectData} {...props} />
}
