import { MRT_ColumnDef } from 'mantine-react-table'
import {
  useDeleteLanguange,
  useFetchLanguages,
} from '../queries/languages-queries'
import { Language } from '../types/language'
import { Table } from '@/shared/ui/table/table'
import { useListParams } from '@/shared/hooks/user-list-params'
import { modals } from '@mantine/modals'
import { MODALS } from '@/shared/ui/custom-modals/modals'
import { EditLanguage } from './edit-language'

export const LanguagesList = () => {
  const { globalFilter, pagination, setGlobalFilter, setPagination } =
    useListParams()

  const {
    data: languages,
    isFetching,
    isError,
    error,
  } = useFetchLanguages({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    keyword: globalFilter,
  })
  const deleteMutation = useDeleteLanguange()

  const columns: MRT_ColumnDef<Language>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Название',
    },
    {
      accessorKey: 'locale',
      header: 'Язык',
    },
  ]

  const handleUpdate = (id: number) => {
    modals.open({
      title: 'Редактирование языка',
      children: <EditLanguage languageId={id} />,
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
      data={languages?.data.data ?? []}
      columns={columns}
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
      rowCount={languages?.data.count}
    />
  )
}
