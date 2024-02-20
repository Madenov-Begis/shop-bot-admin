import { ListParams } from '@/shared/types/list-params'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { productLanguagesApi } from '../api/product-languages-api'
import { notifications } from '@mantine/notifications'
import {
  HTTPError,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import {
  ProductLanguages,
  ProductLanguagesBody,
} from '../types/product-languages'
import { useQueryWithLanguage } from '@/features/languages/hooks/use-query-with-language'
import { SelectType } from '@/shared/types/select-type'

const PRODUCTLANGUAGES = 'product-languages'

export const useFetchProductLanguages = (params: ListParams) => {
  const element = Object.values(params)

  return useQueryWithLanguage<
    ResponseWithPagination<ProductLanguages[]>,
    HTTPError
  >({
    queryFn: () => productLanguagesApi.getAll(params),
    queryKey: [PRODUCTLANGUAGES, ...element],
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export const useFetchProductLanguagesList = () => {
  return useQuery<ResponseWithData<SelectType[]>>({
    queryKey: ['product-languages-lit'],
    queryFn: productLanguagesApi.list,
    staleTime: 30_000,
  })
}

export const useFetchProductLanguage = (productLanguageId: number) => {
  return useQuery<ResponseWithPagination<ProductLanguages>, HTTPError>({
    queryFn: () => productLanguagesApi.getOne(productLanguageId),
    queryKey: ['product-language', productLanguageId],
  })
}

export const useCreateProductLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, ProductLanguagesBody>({
    mutationFn: productLanguagesApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTLANGUAGES] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useUpdateProductLanguages = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { productLanguageId: number; body: ProductLanguagesBody }
  >({
    mutationFn: productLanguagesApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTLANGUAGES] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useDeleteProductLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productLanguagesApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTLANGUAGES] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
    onError: (data) => {
      queryClient.invalidateQueries({
        queryKey: [
          queryClient.invalidateQueries({ queryKey: [PRODUCTLANGUAGES] }),
        ],
      })
      notifications.show({
        title: 'Ошибка',
        message: data.message,
        color: 'red',
      })
    },
  })
}
