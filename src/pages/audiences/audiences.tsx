import { MantineReactTable } from 'mantine-react-table'
import { useState } from 'react'
import { ActionIcon, Flex, Tooltip, Text } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { modals } from '@mantine/modals'
import {
  useDeleteAudience,
  useFetchAudiences,
} from '@/features/audiences/queries/audiences-queries'
import { CreateAudience } from '@/features/audiences/ui/create-audience'
import { AudienceUpdate } from '@/features/audiences/ui/update-audience'

const Audiences = () => {
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

  return (
    <>
      <CreateAudience />
      <MantineReactTable
        columns={columns}
        data={audiences?.data || []}
        enableColumnFilters={false}
        enableFullScreenToggle={false}
        enableHiding={false}
        enableSorting={false}
        enableColumnActions={false}
        rowCount={audiences?.meta.total}
        manualPagination={true}
        onPaginationChange={setPage}
        manualFiltering={true}
        onGlobalFilterChange={(value) => {
          setSearchText(value ?? '')
        }}
        enableRowActions={true}
        renderRowActions={({ row }) => {
          const audienceId = row.original.id
          return (
            <Flex gap="lg">
              <Tooltip label={'Изменить'}>
                <ActionIcon
                  color="orange"
                  onClick={() => {
                    modals.open({
                      children: <AudienceUpdate id={audienceId} />,
                    })
                  }}
                >
                  <IconEdit />
                </ActionIcon>
              </Tooltip>
              <Tooltip label={'Удалить'}>
                <ActionIcon
                  color="red"
                  onClick={() => {
                    modals.openConfirmModal({
                      children: (
                        <Text size="lg" fw={500} ta="center" mb="md">
                          Вы действительно хотите удалить?
                        </Text>
                      ),
                      labels: { confirm: 'Да', cancel: 'Отмена' },
                      onConfirm: () => deleteAudience.mutate(audienceId),
                    })
                  }}
                >
                  <IconTrash />
                </ActionIcon>
              </Tooltip>
            </Flex>
          )
        }}
        state={{
          isLoading: isFetching,
          pagination: page,
          showAlertBanner: isError,
          globalFilter: searchText,
        }}
        mantineTableProps={{
          max: '600px',
        }}
        mantineToolbarAlertBannerProps={
          isError
            ? {
                color: 'red',
                children: error.message,
              }
            : undefined
        }
      />
    </>
  )
}

export default Audiences
