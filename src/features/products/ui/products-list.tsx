import { useListParams } from '@/shared/hooks/user-list-params'
import { useDeleteProduct, useFetchProducts } from '../queries/products-queries'
import { useFetchLanguages } from '@/features/languages/queries/languages-queries'
import { MRT_ColumnDef } from 'mantine-react-table'
import { Products } from '../types/products'
import { Table } from '@/shared/ui/table/table'
import { modals } from '@mantine/modals'
import { MODALS } from '@/shared/ui/custom-modals/modals'
import { useNavigate } from 'react-router-dom'

export const ProductsList = () => {
  const navigate = useNavigate()

  const { globalFilter, pagination, setGlobalFilter, setPagination } =
    useListParams()

  const {
    data: products,
    isFetching,
    isError,
    error,
  } = useFetchProducts({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    keyword: globalFilter,
  })
  const deleteMutation = useDeleteProduct()

  const { data: languages } = useFetchLanguages()

  const title = Array.isArray(languages?.data)
    ? languages.data.map((language) => ({
        accessorKey: `title.${language.locale}`,
        header: `Название ${language.name}`,
      }))
    : []

  const description = Array.isArray(languages?.data)
    ? languages.data.map((language) => ({
        accessorKey: `description.${language.locale}`,
        header: `Описание ${language.name}`,
        maxSize: 200,
      }))
    : []

  const columns: MRT_ColumnDef<Products>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 70,
    },
    {
      accessorKey: 'image',
      header: 'Фото',
      size: 100,
      Cell: ({ cell }) => (
        <img
          style={{ width: '100px', height: '100px' }}
          src={cell.getValue<string>()}
        />
      ),
    },
    {
      accessorKey: 'category.ru',
      header: 'Категория',
    },
    ...title,
    ...description,
  ]
  const handleUpdate = (id: number) => {
    navigate(`update/${id}`)
  }

  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: MODALS.CONFIRM_DIALOG,
      title: 'Подтвердите действие',
      innerProps: {
        text: 'Вы действительно хотите удалить этот язык?',
        onConfirm: async (modalId: string) => {
          await deleteMutation
            .mutateAsync(id)
            .finally(() => modals.close(modalId))
        },
      },
    })
  }

  return (
    <Table
      data={products?.data ?? []}
      columns={[...columns]}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
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
      rowCount={products?.count}
    />
  )
}
