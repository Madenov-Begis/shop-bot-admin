import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { audiencesApi } from '../api/audiences-api'
import { notifications } from '@mantine/notifications'

const AUDIENCES = 'audiences'

export const useFetchAudiences = () => {
  return useQuery({
    queryKey: [AUDIENCES],
    queryFn: audiencesApi.getAll,
    retry: false
  })
}

export const useCreateAudience = () => {
  const queryClient = useQueryClient()

  return useMutation({
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

  return useMutation({
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
