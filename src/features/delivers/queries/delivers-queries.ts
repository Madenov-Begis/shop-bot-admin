import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { deliversApi } from '../api/delivers-api'
import { ListParams } from '@/shared/types/list-params'
import {
  HTTPError,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { Delivers, DeliversBody } from '../types/delivers'
import { notifications } from '@mantine/notifications'

const DELIVERS = 'delivers'

export const useFetchDelivers = (params: ListParams) => {
  return useQuery<ResponseWithPagination<Delivers[]>, HTTPError>({
    queryKey: [DELIVERS, params],
    queryFn: () => deliversApi.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export const useFetchDeliver = (deliverId: number) => {
  return useQuery<ResponseWithData<Delivers>, HTTPError>({
    queryKey: ['deliver', deliverId],
    queryFn: () => deliversApi.getOne(deliverId),
  })
}

export const useCreateDeliver = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, DeliversBody>({
    mutationFn: deliversApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [DELIVERS] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
  })
}

export const useUpdateDeliver = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { deliverId: number; body: DeliversBody }
  >({
    mutationFn: deliversApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [DELIVERS] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
  })
}

export const useDeleteDeliver = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deliversApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [DELIVERS] })
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
