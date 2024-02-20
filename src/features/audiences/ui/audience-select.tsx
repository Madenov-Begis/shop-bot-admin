import { Select, SelectProps } from '@mantine/core'
import { useFetchAudienceList } from '../queries/audiences-queries'

interface AudienceSelect extends SelectProps {}

export const AudienceSelect = (props: AudienceSelect) => {
  const { data: audienceList } = useFetchAudienceList()

  const selectData = audienceList?.data.map((item) => {
    return {
      label: item.name,
      value: item.id.toString(),
    }
  })
  return <Select data={selectData} {...props} />
}
