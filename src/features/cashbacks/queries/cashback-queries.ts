import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

import { cashbacksApi } from '../api/cashbacks-api'
import { Cashback, CashbackBody } from '../types/cashbacks'
import {
  HTTPError,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { useQueryWithLanguage } from '@/features/languages/hooks/use-query-with-language'

const CASHBACKS = 'cashbacks'

export const useFetchCashbaks = (params: ListParams) => {
  const elements = Object.values(params)

  return useQueryWithLanguage<ResponseWithPagination<Cashback[]>, HTTPError>({
    queryKey: [CASHBACKS, ...elements],
    queryFn: () => cashbacksApi.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export const useFetchCashback = (cashbackId: number) => {
  return useQuery<ResponseWithData<Cashback>, HTTPError>({
    queryKey: ['cashback', cashbackId],
    queryFn: () => cashbacksApi.getOne(cashbackId),
  })
}

export const useCreateCashback = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, CashbackBody>({
    mutationFn: cashbacksApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cashbacks'] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useUpdateCashback = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { cashbackId: number; body: CashbackBody }
  >({
    mutationFn: cashbacksApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CASHBACKS] })

      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
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
        message: data.message,
        color: 'green',
      })
    },
    onError: (error) => {
      notifications.show({
        title: 'Ошибка',
        message: error.message,
        color: 'red',
      })
    },
  })
}
