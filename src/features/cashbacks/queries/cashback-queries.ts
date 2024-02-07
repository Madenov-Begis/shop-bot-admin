import {
  QueryClient,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { cashbacksApi } from '../api/cashbacks-api'
import { notifications } from '@mantine/notifications'
import {
  HTTPError,
  ResponseWithData,
  ResponseWithPagination,
} from '@/config/http/types'
import { Cashback, CashbackBody } from '../types/cashbacks'
import { useTranslation } from 'react-i18next'

const CASHBACKS = 'cashbacks'

export const useGetLanguage = () => {
  const { i18n } = useTranslation()

  return i18n.resolvedLanguage
}

const useQueryWithLang = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  options: UseQueryOptions<TQueryFnData, TError, TData>,
  queryClient?: QueryClient
) => {
  const lang = useGetLanguage()

  return useQuery(
    {
      ...options,
      queryKey: [lang, ...options.queryKey],
    },
    queryClient
  )
}

export const useFetchCashbaks = ({
  page,
  per_page,
  search,
}: {
  page: number
  per_page: number
  search?: string
}) => {
  return useQueryWithLang<ResponseWithPagination<Cashback[]>, HTTPError>({
    queryKey: [CASHBACKS, page, per_page, search],
    queryFn: () => cashbacksApi.getAll({ page, per_page, search }),
  })
}

export const useShowCashback = (cashbackId: number) => {
  return useQuery<ResponseWithData<Cashback>, HTTPError>({
    queryKey: ['cashback', cashbackId],
    queryFn: () => cashbacksApi.show(cashbackId),
  })
}

export const useCreateCashback = () => {
  const queryClient = useQueryClient()

  return useMutation<
    {
      message: string
    },
    HTTPError,
    CashbackBody
  >({
    mutationFn: cashbacksApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CASHBACKS] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
  })
}

export const useUpdateCashback = () => {
  const queryClient = useQueryClient()

  return useMutation<
    {
      message: string
    },
    HTTPError,
    { cashbackId: number; body: CashbackBody }
  >({
    mutationFn: cashbacksApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CASHBACKS] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
  })
}

export const useDeleteCashback = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cashbacksApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CASHBACKS] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
    onError: (err) => {
      notifications.show({
        title: 'Ошибка',
        message: err.message ?? 'Неизвестная ошибка',
        color: 'red',
      })
    },
  })
}
