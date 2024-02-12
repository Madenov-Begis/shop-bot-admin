import { useListParams } from '@/shared/hooks/user-list-params'
import { useDeleteCatalog, useFetchCatalogs } from '../queries/catalog-queries'
import { MRT_ColumnDef } from 'mantine-react-table'
import { Catalog } from '../types/catalog-type'
import { Table } from '@/shared/ui/table/table'
import { modals } from '@mantine/modals'
import { UpdateCatalog } from './update-catalog'
import { MODALS } from '@/shared/ui/custom-modals/modals'

export const CatalogsList = () => {
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
    data: catalogs,
    isFetching,
    isError,
    error,
  } = useFetchCatalogs({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    orderby,
    search: globalFilter,
    sort,
  })

  const deleteMutation = useDeleteCatalog()

  const columns: MRT_ColumnDef<Catalog>[] = [
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
      title: 'Редактирование каталога',
      children: <UpdateCatalog catalogId={id} />,
    })
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: MODALS.CONFIRM_DIALOG,
      title: 'Подтвердите действие',
      innerProps: {
        text: 'Вы действительно хотите удалить этот каталог?',
        onConfirm: (modalId: string) => {
          deleteMutation.mutateAsync(id).finally(() => modals.close(modalId))
        },
      },
    })
  }

  return (
    <Table
      data={catalogs?.data ?? []}
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
      rowCount={catalogs?.meta.total}
    />
  )
}
