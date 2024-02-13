import { useListParams } from '@/shared/hooks/user-list-params'
import { Table } from '@/shared/ui/table/table'
import {
  useDeletePublisher,
  useFetchPublishers,
} from '../queries/publishers-queries'
import { MRT_ColumnDef } from 'mantine-react-table'
import { Publisher } from '../types/publishers'
import { modals } from '@mantine/modals'
import { UpdatePublisher } from './update-publisher'
import { MODALS } from '@/shared/ui/custom-modals/modals'

export const PublisherList = () => {
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
    data: publishers,
    isFetching,
    isError,
    error,
  } = useFetchPublishers({
    orderby: orderby,
    page: pagination.pageIndex,
    per_page: pagination.pageSize,
    search: globalFilter,
    sort: sort,
  })

  const deleteMutation = useDeletePublisher()

  const columns: MRT_ColumnDef<Publisher>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Название',
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
      title: 'Редактирование издании',
      children: <UpdatePublisher publisherId={id} />,
    })
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: MODALS.CONFIRM_DIALOG,
      title: 'Подтвердите действие',
      innerProps: {
        text: 'Вы действительно хотите удалить эту изданию?',
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
      data={publishers?.data ?? []}
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
      rowCount={publishers?.meta.total}
    />
  )
}
