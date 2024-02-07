import {
  useDeleteCashback,
  useFetchCashbaks,
} from '@/features/cashbacks/queries/cashback-queries'
import { CreateCashback } from '@/features/cashbacks/ui/create-cashback'
import { UpdateCashback } from '@/features/cashbacks/ui/update-cashback'
import { CustomTable } from '@/ui'
import { Flex, Title } from '@mantine/core'
import { modals } from '@mantine/modals'

import { useState } from 'react'

const CashbacksPage = () => {
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
  })

  const deleteCashback = useDeleteCashback()

  const onClickIcon = (id: number) => {
    modals.open({
      children: <UpdateCashback id={id} />,
    })
  }

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

      <CustomTable
        columns={columns}
        data={cashbacks}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        deleteRow={deleteCashback}
        isFetching={isFetching}
        isError={isError}
        error={error}
        onClickIcon={onClickIcon}
      />
    </>
  )
}

export default CashbacksPage
