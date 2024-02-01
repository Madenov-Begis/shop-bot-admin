import {
  useDeleteCashback,
  useFetchCashbaks,
} from '@/features/cashbacks/queries/cashback-queryies'
import { CreateCashback } from '@/features/cashbacks/ui/create-cashback'
import { UpdateCashback } from '@/features/cashbacks/ui/update-cashback'
import { ActionIcon, Flex, Tooltip, Text, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { MantineReactTable } from 'mantine-react-table'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CashbacksPage = () => {
  const { i18n } = useTranslation()

  const lang = i18n.resolvedLanguage

  const [page, setPage] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const [search, setSearch] = useState('')

  const {
    data: cashbacks,
    isError,
    isFetching,
    error,
  } = useFetchCashbaks({
    page: page.pageIndex,
    per_page: page.pageSize,
    search,
    lang,
  })

  const deleteCashback = useDeleteCashback()

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 50,
    },
    {
      accessorKey: 'percentage',
      header: 'Процент',
    },
    {
      accessorKey: 'name',
      header: 'Наименование',
    },
  ]

  return (
    <>
      <Flex justify="space-between" align="center" mb="lg">
        <Title order={2}>Кэшбеки</Title>
        <CreateCashback />
      </Flex>

      <MantineReactTable
        columns={columns}
        data={cashbacks?.data || []}
        enableColumnFilters={false}
        enableFullScreenToggle={false}
        enableHiding={false}
        enableSorting={false}
        enableColumnActions={false}
        rowCount={cashbacks?.meta.total}
        manualPagination={true}
        onPaginationChange={setPage}
        manualFiltering={true}
        onGlobalFilterChange={(value) => {
          setSearch(value ?? '')
        }}
        enableRowActions={true}
        renderRowActions={({ row }) => {
          const cashbackId = row.original.id
          return (
            <Flex gap="lg">
              <Tooltip label={'Изменить'}>
                <ActionIcon
                  color="orange"
                  onClick={() => {
                    modals.open({
                      children: <UpdateCashback id={cashbackId} />,
                    })
                  }}
                >
                  <IconEdit />
                </ActionIcon>
              </Tooltip>
              <Tooltip label={'Удалить'}>
                <ActionIcon
                  color="red"
                  onClick={() => {
                    modals.openConfirmModal({
                      children: (
                        <Text size="lg" fw={500} ta="center" mb="md">
                          Вы действительно хотите удалить?
                        </Text>
                      ),
                      labels: { confirm: 'Да', cancel: 'Отмена' },
                      onConfirm: () => deleteCashback.mutate(cashbackId),
                    })
                  }}
                >
                  <IconTrash />
                </ActionIcon>
              </Tooltip>
            </Flex>
          )
        }}
        state={{
          isLoading: isFetching,
          pagination: page,
          showAlertBanner: isError,
          globalFilter: search,
        }}
        mantineTableProps={{
          max: '600px',
        }}
        mantineToolbarAlertBannerProps={
          isError
            ? {
                color: 'red',
                children: error.message,
              }
            : undefined
        }
      />
    </>
  )
}

export default CashbacksPage
