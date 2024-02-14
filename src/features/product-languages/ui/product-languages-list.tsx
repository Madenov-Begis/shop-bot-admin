import { Table } from '@/shared/ui/table/table'
import {
  useDeleteProductLanguage,
  useFetchProductLanguages,
} from '../queries/product-languages-queries'
import { useListParams } from '@/shared/hooks/user-list-params'
import { ProductLanguages } from '../types/product-languages'
import { MRT_ColumnDef } from 'mantine-react-table'
import { modals } from '@mantine/modals'
import { MODALS } from '@/shared/ui/custom-modals/modals'
import { UpdateProductLanguage } from './update-product-language'

export const ProductLanguagesList = () => {
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
    data: productLanguages,
    isFetching,
    isError,
    error,
  } = useFetchProductLanguages({
    orderby: orderby,
    page: pagination.pageIndex,
    per_page: pagination.pageSize,
    search: globalFilter,
    sort: sort,
  })

  const deleteMutation = useDeleteProductLanguage()

  const columns: MRT_ColumnDef<ProductLanguages>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Название',
    },
  ]

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

  const handleUpdate = (id: number) => {
    modals.open({
      title: 'Редактирование',
      children: <UpdateProductLanguage productLanguageId={id} />,
    })
  }

  return (
    <Table
      data={productLanguages?.data ?? []}
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
      rowCount={productLanguages?.meta.total}
    />
  )
}
