import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { newsApi } from '../api/news-api'
import { ListParams } from '@/shared/types/list-params'
import {
  HTTPError,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { News, NewsBody } from '../types/news'
import { notifications } from '@mantine/notifications'

const NEWS = 'news'

export const useFetchNews = (params: ListParams) => {
  const element = Object.values(params)

  return useQuery<ResponseWithPagination<News[]>, HTTPError>({
    queryKey: [NEWS, ...element],
    queryFn: () => newsApi.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export const useCreateNews = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, NewsBody>({
    mutationKey: [NEWS],
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [NEWS] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
  })
}
