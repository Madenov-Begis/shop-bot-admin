import { useListParams } from '@/shared/hooks/user-list-params'
import { Table } from '@/shared/ui/table/table'
import { useDeleteDeliver, useFetchDelivers } from '../queries/delivers-queries'
import { MRT_ColumnDef } from 'mantine-react-table'
import { Delivers } from '../types/delivers'
import { modals } from '@mantine/modals'
import { MODALS } from '@/shared/ui/custom-modals/modals'
import { UpdateDeliver } from './update-deliver'

export const DeliversList = () => {
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
    data: delivers,
    isFetching,
    isError,
    error,
  } = useFetchDelivers({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    orderby,
    search: globalFilter,
    sort,
  })

  const deleteMutation = useDeleteDeliver()

  const columns: MRT_ColumnDef<Delivers>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Название',
    },
    {
      accessorKey: 'in_tashkent',
      header: 'По Ташкенту',
    },
    {
      accessorKey: 'in_uzbekistan',
      header: 'По всему Узбекистану',
    },
  ]

  const handleUpdate = (id: number) => {
    modals.open({
      title: 'Редактирование',
      children: <UpdateDeliver deliverId={id} />,
    })
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: MODALS.CONFIRM_DIALOG,
      title: 'Подтвердите действие',
      innerProps: {
        text: 'Вы действительно хотите удалить?',
        onConfirm: (modalId: string) => {
          return deleteMutation
            .mutateAsync(id)
            .finally(() => modals.close(modalId))
        },
      },
    })
  }

  return (
    <Table
      columns={columns}
      data={delivers?.data || []}
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
      rowCount={delivers?.meta.total}
    />
  )
}
