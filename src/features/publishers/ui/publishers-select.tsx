import { Select, SelectProps } from '@mantine/core'
import { useFetchPublishersList } from '../queries/publishers-queries'

interface PublisherSelect extends SelectProps {}

export const PublisherSelect = (props: PublisherSelect) => {
  const { data: publisherList } = useFetchPublishersList()

  const selectData = publisherList?.data.map((item) => {
    return {
      label: item.name,
      value: item.id.toString(),
    }
  })

  return <Select data={selectData} {...props} />
}
