import { Select, SelectProps } from '@mantine/core'
import { useFetchCashbakList } from '../queries/cashback-queries'

interface AudienceSelect extends SelectProps {}

export const CashbacksSelect = (props: AudienceSelect) => {
  const { data: cashbackList } = useFetchCashbakList()

  const selectData = cashbackList?.data.map((item) => {
    return {
      label: item.name,
      value: item.id.toString(),
    }
  })

  return <Select data={selectData} {...props} />
}
