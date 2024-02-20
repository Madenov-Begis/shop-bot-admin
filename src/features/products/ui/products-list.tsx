import { useListParams } from '@/shared/hooks/user-list-params'
import { Table } from '@/shared/ui/table/table'
import { useDeleteProduct, useFetchProducts } from '../queries/product-queries'
import { MRT_ColumnDef } from 'mantine-react-table'
import { Product } from '../types/products'
import { modals } from '@mantine/modals'
import { MODALS } from '@/shared/ui/custom-modals/modals'
import { useNavigate } from 'react-router-dom'

export const ProductsList = () => {
  const navigate = useNavigate()

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
    data: products,
    isFetching,
    isError,
    error,
  } = useFetchProducts({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    search: globalFilter,
    orderby,
    sort: sort,
  })

  const columns: MRT_ColumnDef<Product>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Название',
    },
    {
      accessorKey: 'audience',
      header: 'Аудитория',
    },
    {
      accessorKey: 'cashback',
      header: 'Кэшбек',
    },
    {
      accessorKey: 'catalog',
      header: 'Каталог',
    },
    {
      accessorKey: 'category',
      header: 'Категория',
    },
    {
      accessorKey: 'company',
      header: 'Компания',
    },
    {
      accessorKey: 'deliver',
      header: 'Издания',
    },
    {
      accessorKey: 'created_by',
      header: 'Создан',
    },
  ]

  const deleteMutation = useDeleteProduct()

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: MODALS.CONFIRM_DIALOG,
      title: 'Подтвердите действие',
      innerProps: {
        text: 'Вы действительно хотите удалить этот кэшбек?',
        onConfirm: (modalId: string) => {
          return deleteMutation
            .mutateAsync(id)
            .finally(() => modals.close(modalId))
        },
      },
    })
  }

  const handleUpdate = (id: number) => {
    navigate(`/products/update/${id}`)
  }

  return (
    <Table
      data={products?.data ?? []}
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
      rowCount={products?.meta.total}
    />
  )
}
