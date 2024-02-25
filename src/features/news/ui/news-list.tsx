import { useListParams } from '@/shared/hooks/user-list-params'
import { useFetchNews } from '../queries/news-queries'
import { MRT_ColumnDef } from 'mantine-react-table'
import { News } from '../types/news'
import { Table } from '@/shared/ui/table/table'

export const NewsList = () => {
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
    data: news,
    isFetching,
    isError,
    error,
  } = useFetchNews({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    orderby,
    search: globalFilter,
    sort,
  })

  const columns: MRT_ColumnDef<News>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'title',
      header: 'Название',
    },
    {
      accessorKey: 'description',
      header: 'Описание',
    },
    {
      accessorKey: 'author',
      header: 'Автор',
    },
  ]

  //   const handleUpdate = (id: number) => {
  //     modals.open({
  //       title: 'Редактирование',
  //       children: <UpdateDeliver deliverId={id} />,
  //     })
  //   }

  //   const handleDelete = (id: number) => {
  //     modals.openContextModal({
  //       modal: MODALS.CONFIRM_DIALOG,
  //       title: 'Подтвердите действие',
  //       innerProps: {
  //         text: 'Вы действительно хотите удалить?',
  //         onConfirm: (modalId: string) => {
  //           return deleteMutation
  //             .mutateAsync(id)
  //             .finally(() => modals.close(modalId))
  //         },
  //       },
  //     })
  //   }

  return (
    <Table
      columns={columns}
      data={news?.data || []}
      //   onUpdate={handleUpdate}
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
      rowCount={news?.meta.total}
    />
  )
}
