import { MantineReactTable } from 'mantine-react-table'
import { useFetchAudiences } from '../../features/audiences/queries/audiences-queries'
// import { ActionIcon, Flex } from '@mantine/core'
// import { IconEdit, IconTrash } from '@tabler/icons-react'

const Audiences = () => {
  const { data, isFetching, isError } = useFetchAudiences()

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'age',
      header: 'Age',
    },
  ]

  return (
    <MantineReactTable
      columns={columns}
      data={data?.data || []}
      enableColumnFilters={false}
      enableDensityToggle={true}
      enableFilters={true}
      enableFullScreenToggle={false}
      enableHiding={false}
      enableSorting={false}
      enableColumnActions={false}
      // rowCount={data?.total || 0}
      // manualPagination={true}
      // onPaginationChange={setSkip}
      enableRowActions={true}
      // renderRowActionMenuItems={({ row }) => (
      //   <Flex>
      //     <ActionIcon
      //       color="orange"
      //       onClick={() => {
      //         console.log('edit')
      //       }}
      //     >
      //       <IconEdit />
      //     </ActionIcon>
      //     <ActionIcon
      //       color="red"
      //       onClick={() => {
      //         console.log('delete')
      //       }}
      //     >
      //       <IconTrash />
      //     </ActionIcon>
      //   </Flex>
      // )}
      state={{
        isLoading: isFetching,
        // pagination: skip,
        showAlertBanner: isError,
      }}
      mantineTableProps={{
        max: '600px',
        // height: '600px',
      }}
      mantineToolbarAlertBannerProps={
        isError
          ? {
              color: 'red',
              children: 'Error loading data',
            }
          : undefined
      }
    />
  )
}

export default Audiences
