import { useState } from 'react'
import { Flex, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import {
  useDeleteAudience,
  useFetchAudiences,
} from '@/features/audiences/queries/audiences-queries'
import { CreateAudience } from '@/features/audiences/ui/create-audience'
import { AudienceUpdate } from '@/features/audiences/ui/update-audience'
import { CustomTable } from '@/ui'

const AudiencesPage = () => {
  const [page, setPage] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const [searchText, setSearchText] = useState('')

  const {
    data: audiences,
    isFetching,
    isError,
    error,
  } = useFetchAudiences({
    page: page.pageIndex + 1,
    search: searchText,
    per_page: page.pageSize,
  })

  const deleteAudience = useDeleteAudience()

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 50,
    },
    {
      accessorKey: 'age',
      header: 'Age',
    },
  ]

  const onClickIcon = (id: number) => {
    modals.open({
      children: <AudienceUpdate id={id} />,
    })
  }

  return (
    <>
      <Flex justify="space-between" align="center">
        <Title order={2}>Возрастное ограничение</Title>
        <CreateAudience />
      </Flex>

      <CustomTable
        columns={columns}
        data={audiences}
        page={page}
        setPage={setPage}
        search={searchText}
        setSearch={setSearchText}
        deleteRow={deleteAudience}
        isFetching={isFetching}
        isError={isError}
        error={error}
        onClickIcon={onClickIcon}
      />
    </>
  )
}

export default AudiencesPage
