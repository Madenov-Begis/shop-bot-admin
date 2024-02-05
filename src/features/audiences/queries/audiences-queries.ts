import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { audiencesApi } from '../api/audiences-api'
import { notifications } from '@mantine/notifications'
import {
  HTTPError,
  ResponseWithData,
  ResponseWithPayload,
} from '@/config/http/types'
import { Audience, AudienceBody } from '../types/audience'

const AUDIENCES = 'audiences'

export const useFetchAudiences = ({
  page,
  search,
  per_page,
}: {
  page: number
  search?: string
  per_page: number
}) => {
  return useQuery<ResponseWithData<Audience[]>, HTTPError>({
    queryKey: [AUDIENCES, page, per_page, search],
    queryFn: () => audiencesApi.getAll({ page, per_page, search }),
  })
}

export const useShowAudience = (audienceId: number) => {
  return useQuery<ResponseWithPayload<Audience>, HTTPError>({
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
