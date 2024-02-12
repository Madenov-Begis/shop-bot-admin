import { useListParams } from '@/shared/hooks/user-list-params'
import { Table } from '@/shared/ui/table/table'
import { useDeleteCompany, useFetchCompanies } from '../queries/company-queries'
import { Company } from '../types/company'
import { MRT_ColumnDef } from 'mantine-react-table'
import { modals } from '@mantine/modals'
import { MODALS } from '@/shared/ui/custom-modals/modals'
import { UpdateCompany } from './update-company'

export const CompanyList = () => {
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
    data: companies,
    isFetching,
    isError,
    error,
  } = useFetchCompanies({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    orderby,
    search: globalFilter,
    sort,
  })

  const deleteMutation = useDeleteCompany()

  const columns: MRT_ColumnDef<Company>[] = [
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
      title: 'Редактирование компании',
      children: <UpdateCompany companyId={id}/>,
    })
  }
  
  const handleDelete = (id: number) => {
    modals.openContextModal({
      modal: MODALS.CONFIRM_DIALOG,
      title: 'Подтвердите действие',
      innerProps: {
        text: 'Вы действительно хотите удалить эту компанию?',
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
      columns={columns}
      data={companies?.data || []}
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
      rowCount={companies?.meta.total}
    />
  )
}
