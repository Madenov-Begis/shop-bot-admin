import { useQueryWithLanguage } from '@/features/languages/hooks/use-query-with-language'
import { ListParams } from '@/shared/types/list-params'
import { publishersApi } from '../api/publishers-api'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  HTTPError,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { Publisher, PublisherBody, PublisherDetail } from '../types/publishers'
import { notifications } from '@mantine/notifications'
import { SelectType } from '@/shared/types/select-type'

const PUBLIHSER = 'publishers'

export const useFetchPublishers = (params: ListParams) => {
  const element = Object.keys(params)

  return useQueryWithLanguage<ResponseWithPagination<Publisher[]>, HTTPError>({
    queryKey: [PUBLIHSER, ...element],
    queryFn: () => publishersApi.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export const useFetchPublishersList = () => {
  return useQuery<ResponseWithData<SelectType[]>>({
    queryKey: ['publisher-list'],
    queryFn: publishersApi.list,
    staleTime: 30_000,
  })
}

export const useFetchPublisher = (publisherId: number) => {
  return useQuery<ResponseWithPagination<PublisherDetail>, HTTPError>({
    queryKey: ['publisher', publisherId],
    queryFn: () => publishersApi.getOne(publisherId),
  })
}

export const useCreatePublisher = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, PublisherBody>({
    mutationFn: publishersApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PUBLIHSER] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useUpdatePublisher = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { publisherId: number; body: PublisherBody }
  >({
    mutationFn: publishersApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PUBLIHSER] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useDeletePublisher = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: publishersApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PUBLIHSER] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
    onError: (data) => {
      queryClient.invalidateQueries({ queryKey: [PUBLIHSER] })
      notifications.show({
        title: 'Ошибка',
        message: data.message,
        color: 'red',
      })
    },
  })
}
