import { useQueryWithLanguage } from '@/features/languages/hooks/use-query-with-language'
import { ListParams } from '@/shared/types/list-params'
import { categoryApi } from '../api/category-api'
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
import { Category, CategoryBody, CategoryList } from '../types/category'
import { notifications } from '@mantine/notifications'

const CATEGORIES = 'categories'

export const useFetchCategories = (params: ListParams) => {
  const elements = Object.values(params)

  return useQueryWithLanguage<ResponseWithPagination<Category[]>, HTTPError>({
    queryKey: [CATEGORIES, ...elements],
    queryFn: () => categoryApi.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export const useFetchCategory = (categoryId: number) => {
  return useQuery<ResponseWithData<Category>, HTTPError>({
    queryKey: ['catalog', categoryId],
    queryFn: () => categoryApi.getOne(categoryId),
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, CategoryBody>({
    mutationFn: categoryApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useFetchCategoryList = () => {
  return useQuery<ResponseWithData<CategoryList[]>, HTTPError>({
    queryFn: categoryApi.list,
    queryKey: ['list'],
    staleTime: 30_000,
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { categoryId: number; body: CategoryBody }
  >({
    mutationFn: categoryApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES] })

      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoryApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES] })

      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
    onError: (error) => {
      notifications.show({
        title: 'Ошибка',
        message: error.message ?? 'Неизвестная ошибка',
        color: 'red',
      })
    },
  })
}
