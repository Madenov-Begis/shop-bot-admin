import { Select, SelectProps } from '@mantine/core'
import { useFetchDeliversList } from '../queries/delivers-queries'

interface DeliversSelect extends SelectProps {}

export const DeliversSelect = (props: DeliversSelect) => {
  const { data: deliversList } = useFetchDeliversList()

  const selectData = deliversList?.data.map((item) => {
    return {
      label: item.name,
      value: item.id.toString(),
    }
  })

  return <Select data={selectData} {...props} />
}
