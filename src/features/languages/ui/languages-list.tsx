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
    data: languages,
    isFetching,
    isError,
    error,
  } = useFetchLanguages({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    search: globalFilter,
    orderby,
    sort,
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
      header: 'Locale',
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
        onConfirm: (modalId: string) => {
          deleteMutation.mutateAsync(id).finally(() => modals.close(modalId))
        },
      },
    })
  }

  return (
    <Table
      data={languages?.data ?? []}
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
      rowCount={languages?.meta.total}
    />
  )
}
