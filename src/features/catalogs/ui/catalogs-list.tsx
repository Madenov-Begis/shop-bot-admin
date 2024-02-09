import { useListParams } from '@/shared/hooks/user-list-params'
import { useFetchCatalogs } from '../query/catalog-queries'
import { MRT_ColumnDef } from 'mantine-react-table'
import { Catalog } from '../types/catalog-type'
import { Table } from '@/shared/ui/table/table'
import { modals } from '@mantine/modals'
import { UpdateCatalog } from './update-catalog'

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
      title: 'Редактирование кэшбека',
      children: <UpdateCatalog catalogId={id} />,
    })
  }

  return (
    <Table
      data={catalogs?.data ?? []}
      columns={columns}
      onUpdate={handleUpdate}
      //   onDelete={handleDelete}
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
