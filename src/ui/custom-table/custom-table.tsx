import { HTTPError, ResponseWithData } from '@/config/http/types'
import { ActionIcon, Flex, Tooltip, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { UseMutationResult } from '@tanstack/react-query'
import { MantineReactTable } from 'mantine-react-table'
import { Dispatch, SetStateAction } from 'react'

interface CustomTableProps {
  columns: (
    | { accessorKey: string; header: string; size: number }
    | { accessorKey: string; header: string; size?: undefined }
  )[]
  data?: ResponseWithData<any>
  page: { pageIndex: number; pageSize: number }
  setPage: Dispatch<SetStateAction<{ pageIndex: number; pageSize: number }>>
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  deleteRow: UseMutationResult<{ message: string }, Error, number, unknown>
  isFetching: boolean
  isError: boolean
  error: HTTPError | null
  onClickIcon: (id: number) => void
}

export const CustomTable = ({
  columns,
  data,
  page,
  setPage,
  search,
  setSearch,
  deleteRow,
  isFetching,
  isError,
  error,
  onClickIcon,
}: CustomTableProps) => {
  return (
    <MantineReactTable
      columns={columns}
      data={data?.data || []}
      enableColumnFilters={false}
      enableFullScreenToggle={false}
      enableHiding={false}
      enableSorting={false}
      enableColumnActions={false}
      rowCount={data?.meta.total}
      manualPagination={true}
      onPaginationChange={setPage}
      manualFiltering={true}
      onGlobalFilterChange={(value) => {
        setSearch(value ?? '')
      }}
      enableRowActions={true}
      renderRowActions={({ row }) => {
        const rowId = row.original.id
        return (
          <Flex gap="lg">
            <Tooltip label={'Изменить'}>
              <ActionIcon color="orange" onClick={() => onClickIcon(rowId)}>
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
                    onConfirm: () => deleteRow.mutate(rowId),
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
        globalFilter: search,
      }}
      mantineTableProps={{
        max: '600px',
      }}
      mantineToolbarAlertBannerProps={
        isError
          ? {
              color: 'red',
              children: error?.message,
            }
          : undefined
      }
    />
  )
}
