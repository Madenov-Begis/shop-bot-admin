import { Select, SelectProps } from '@mantine/core'
import { useFetchCompanyList } from '../queries/company-queries'

interface CompaniesSelect extends SelectProps {}

export const CompaniesSelect = (props: CompaniesSelect) => {
  const { data: companiesList } = useFetchCompanyList()

  const selectData = companiesList?.data.map((item) => {
    return {
      label: item.name,
      value: item.id.toString(),
    }
  })

  return <Select data={selectData} {...props} />
}
