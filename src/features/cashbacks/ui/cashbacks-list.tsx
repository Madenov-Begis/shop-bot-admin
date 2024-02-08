import { modals } from '@mantine/modals'
import { MRT_ColumnDef } from 'mantine-react-table'

import {
  useDeleteCashback,
  useFetchCashbaks,
} from '../queries/cashback-queries'
import { Cashback } from '../types/cashbacks'

import { Table } from '@/shared/ui/table/table'
import { useListParams } from '@/shared/hooks/user-list-params'
import { MODALS } from '@/shared/ui/custom-modals/modals'
import { EditCashback } from './edit-cashback'

export const CashbacksList = () => {
  const {
    sorting,
    globalFilter,
    pagination,
    orderby,
    sort,
    setGlobalFilter,
    setPagination,
    setSorting,
  } = useListParams()

  const {
    data: cashbacks,
    isFetching,
    isError,
    error,
  } = useFetchCashbaks({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    search: globalFilter,
    orderby,
    sort,
  })
  const deleteMutation = useDeleteCashback()

  const columns: MRT_ColumnDef<Cashback>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Название',
    },
    {
      accessorKey: 'percentage',
      header: 'Процент',
      accessorFn: (row) => `${row.percentage}%`,
    },
    {
      accessorKey: 'created_at',
      header: 'Дата создания',
      accessorFn: (row) => new Date(row.created_at).toLocaleString(),
    },
    {
      accessorKey: 'updated_at',
      header: 'Дата редактирования',
      accessorFn: (row) => new Date(row.updated_at).toLocaleString(),
    },
  ]

  const handleUpdate = (id: number) => {
    modals.open({
      title: 'Редактирование кэшбека',
      children: <EditCashback cashbackId={id} />,
    })
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: MODALS.CONFIRM_DIALOG,
      title: 'Подтвердите действие',
      innerProps: {
        text: 'Вы действительно хотите удалить этот кэшбек?',
        onConfirm: (modalId: string) => {
          deleteMutation.mutateAsync(id).finally(() => modals.close(modalId))
        },
      },
    })
  }

  return (
    <Table
      data={cashbacks?.data ?? []}
      columns={columns}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      state={{
        isLoading: isFetching,
        showAlertBanner: isError,
        pagination,
        globalFilter,
        sorting,
      }}
      isError={isError}
      errorText={error?.message ?? 'Unknown Error'}
      manualSorting={true}
      manualFiltering={true}
      manualPagination={true}
      onSortingChange={setSorting}
      onGlobalFilterChange={(value) => {
        setGlobalFilter(value ?? '')
      }}
      onPaginationChange={setPagination}
      rowCount={cashbacks?.meta.total}
    />
  )
}
