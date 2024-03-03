import { useListParams } from '@/shared/hooks/user-list-params'
import {
  useDeleteCategory,
  useFetchCategories,
} from '../queries/categories-queries'
import { MRT_ColumnDef } from 'mantine-react-table'
import { DynamicDataItem } from '../types/categories'
import { modals } from '@mantine/modals'
import { MODALS } from '@/shared/ui/custom-modals/modals'
import { Table } from '@/shared/ui/table/table'
import { useFetchLanguages } from '@/features/languages/queries/languages-queries'
import { UpdateCategory } from './update-category'

export const CategoryList = () => {
  const { globalFilter, pagination, setGlobalFilter, setPagination } =
    useListParams()

  const {
    data: products,
    isFetching,
    isError,
    error,
  } = useFetchCategories({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    keyword: globalFilter,
  })

  const deleteMutation = useDeleteCategory()

  const { data: languages } = useFetchLanguages()

  const costLang = Array.isArray(languages?.data)
    ? languages.data.map((language) => ({
        accessorKey: `${language.locale}`,
        header: `Название ${language.name}`,
      }))
    : []

  const columns: MRT_ColumnDef<DynamicDataItem>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 70,
    },

    ...costLang,
  ]

  const handleUpdate = (id: number) => {
    modals.open({
      title: 'Редактирование языка',
      children: <UpdateCategory id={id} />,
    })
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
