import { useListParams } from '@/shared/hooks/user-list-params'
import { Table } from '@/shared/ui/table/table'
import {
  useDeleteCategory,
  useFetchCategories,
} from '../queries/category-queries'
import { MRT_ColumnDef } from 'mantine-react-table'
import { Category } from '../types/category'
import { modals } from '@mantine/modals'
import { UpdateCategory } from './update-category'
import { MODALS } from '@/shared/ui/custom-modals/modals'

export const CategoriesList = () => {
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
  } = useFetchCategories({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    orderby,
    search: globalFilter,
    sort,
  })

  const deleteMutation = useDeleteCategory()

  const columns: MRT_ColumnDef<Category>[] = [
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
      title: 'Редактирование категории',
      children: <UpdateCategory categoryId={id} />,
    })
  }
  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: MODALS.CONFIRM_DIALOG,
      title: 'Подтвердите действие',
      innerProps: {
        text: 'Вы действительно хотите удалить эту категорию?',
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
      enableExpanding={true}
      getSubRows={(originalRow) => originalRow.childrens}
    />
  )
}
