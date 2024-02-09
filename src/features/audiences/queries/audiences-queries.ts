import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { audiencesApi } from '../api/audiences-api'
import { notifications } from '@mantine/notifications'
import { Audience, AudienceBody } from '../types/audience'
import {
  HTTPError,
  ResponseWithData,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'

const AUDIENCES = 'audiences'

export const useFetchAudiences = (params: ListParams) => {
  const elements = Object.keys(params)

  return useQuery<ResponseWithPagination<Audience[]>, HTTPError>({
    queryKey: [AUDIENCES, ...elements],
    queryFn: () => audiencesApi.getAll(params),
  })
}

export const useShowAudience = (audienceId: number) => {
  return useQuery<ResponseWithData<Audience>, HTTPError>({
    queryKey: ['audience', audienceId],
    queryFn: () => audiencesApi.show(audienceId),
  })
}

export const useCreateAudience = () => {
  const queryClient = useQueryClient()

  return useMutation<
    {
      message: string
    },
    HTTPError,
    AudienceBody
  >({
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
    {
      message: string
    },
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
