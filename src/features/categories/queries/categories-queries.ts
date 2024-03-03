import { ListParams } from '@/shared/types/list-params'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoriesApi } from '../api/categories-api'
import { notifications } from '@mantine/notifications'
import { CategoryBody, DynamicDataItem } from '../types/categories'
import {
  HTTPError,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export const useFetchCategories = (params: ListParams) => {
  return useQuery<ResponseWithPagination<DynamicDataItem[]>, HTTPError>({
    queryKey: ['categories', params],
    queryFn: () => categoriesApi.getAll(params),
  })
}
export const useFetchCategoryList = () => {
  return useQuery({
    queryKey: ['category-list'],
    queryFn: categoriesApi.list,
  })
}

export const useFetchCategory = (id: number) => {
  return useQuery<FieldWithLanguages, HTTPError>({
    queryKey: ['category', id],
    queryFn: () => categoriesApi.getOne(id),
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, CategoryBody>({
    mutationFn: categoriesApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { id: number; body: CategoryBody }
  >({
    mutationFn: categoriesApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      notifications.show({
        title: 'Успешно',
        color: 'green',
        message: data.message,
      })
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, number>({
    mutationFn: categoriesApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
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
