import { useListParams } from '@/shared/hooks/user-list-params'
import { Table } from '@/shared/ui/table/table'
import { useFetchUsers } from '../queries/users-queries'
import { MRT_ColumnDef } from 'mantine-react-table'
import { Users } from '../types/users-type'
import dayjs from 'dayjs'
import { useMemo } from 'react'

export const UsersList = () => {
  const { globalFilter, pagination, setGlobalFilter, setPagination } =
    useListParams()

  const {
    data: products,
    isFetching,
    isError,
    error,
  } = useFetchUsers({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    keyword: globalFilter,
  })

  const columns: MRT_ColumnDef<Users>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 70,
      },
      {
        accessorKey: 'telegram_id',
        header: 'Telegram_ID',
      },
      {
        accessorKey: 'first_name',
        header: 'Имя',
      },
      {
        accessorKey: 'last_name',
        header: 'Фамилия',
      },
      {
        accessorKey: 'username',
        header: 'USER_NAME',
      },
      {
        accessorKey: 'phone',
        header: 'Номер телефонаы',
      },
      {
        accessorKey: 'created_at',
        header: 'Дата создания',
        Cell: ({ cell }) => {
          return (
            <div>{dayjs(String(cell.getValue())).format('DD-MM-YYYY')}</div>
          )
        },
      },
    ],
    []
  )

  return (
    <Table
      data={products?.data.data ?? []}
      columns={[...columns]}
      enableRowActions={false}
      state={{
        isLoading: isFetching,
        showAlertBanner: isError,
        pagination,
        globalFilter,
      }}
      isError={isError}
      errorText={error?.message ?? 'Unknown Error'}
      manualFiltering={true}
      manualPagination={true}
      onGlobalFilterChange={(value) => {
        setGlobalFilter(value ?? '')
      }}
      onPaginationChange={setPagination}
      rowCount={products?.data.count}
    />
  )
}
