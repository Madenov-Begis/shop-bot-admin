import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { audiencesApi } from '../api/audiences-api'
import { notifications } from '@mantine/notifications'
import { Audience, AudienceBody } from '../types/audience'
import {
  HTTPError,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { SelectType } from '@/shared/types/select-type'

const AUDIENCES = 'audiences'

export const useFetchAudiences = (params: ListParams) => {
  return useQuery<ResponseWithPagination<Audience[]>, HTTPError>({
    queryKey: [AUDIENCES, params],
    queryFn: () => audiencesApi.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export const useFetchAudienceList = () => {
  return useQuery<ResponseWithData<SelectType[]>>({
    queryKey: ['audiences-list'],
    queryFn: audiencesApi.list,
    staleTime: 30_000,
  })
}

export const useShowAudience = (audienceId: number) => {
  return useQuery<ResponseWithData<Audience>, HTTPError>({
    queryKey: ['audience', audienceId],
    queryFn: () => audiencesApi.getOne(audienceId),
  })
}

export const useCreateAudience = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, AudienceBody>({
    mutationFn: audiencesApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [AUDIENCES] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
  })
}

export const useUpdateAudience = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { audienceId: number; body: AudienceBody }
  >({
    mutationFn: audiencesApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [AUDIENCES] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
  })
}

export const useDeleteAudience = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: audiencesApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [AUDIENCES] })
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
