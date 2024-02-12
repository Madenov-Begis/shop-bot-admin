import { useListParams } from '@/shared/hooks/user-list-params'
import { Table } from '@/shared/ui/table/table'
import { modals } from '@mantine/modals'
import { useDeleteAudience, useFetchAudiences } from '../queries/audiences-queries'
import { AudienceUpdate } from './update-audience'
import { MODALS } from '@/shared/ui/custom-modals/modals'

export const AudienceList = () => {
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
    data: audiences,
    isFetching,
    isError,
    error,
  } = useFetchAudiences({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    search: globalFilter,
    orderby,
    sort,
  })
  const deleteMutation = useDeleteAudience()

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

  const handleUpdate = (id: number) => {
    modals.open({
      title: 'Редактирование возрастного ограничения',
      children: <AudienceUpdate id={id} />,
    })
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: MODALS.CONFIRM_DIALOG,
      title: 'Подтвердите действие',
      innerProps: {
        text: 'Вы действительно хотите удалить это возрастное ограничение?',
        onConfirm: (modalId: string) => {
          deleteMutation.mutateAsync(id).finally(() => modals.close(modalId))
        },
      },
    })
  }

  return (
    <Table
      data={audiences?.data ?? []}
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
      rowCount={audiences?.meta.total}
    />
  )
}