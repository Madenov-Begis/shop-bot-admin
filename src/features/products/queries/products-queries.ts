import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/products-api'
import { ListParams } from '@/shared/types/list-params'
import { notifications } from '@mantine/notifications'
import { HTTPError, ResponseWithData, ResponseWithPagination } from '@/shared/types/http'
import { Products } from '../types/products'

export const useFetchProducts = (params: ListParams) => {
  return useQuery<ResponseWithPagination<Products[]>, HTTPError>({
    queryFn: () => productsApi.getAll(params),
    queryKey: ['products', params],
  })
}

export const useFetchProduct = (id: string | undefined) => {
  return useQuery<ResponseWithData<Products>, HTTPError>({
    queryKey: ['product', id],
    queryFn: () => productsApi.getOne(id),
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
  })
}
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
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
