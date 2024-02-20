import { useQueryWithLanguage } from '@/features/languages/hooks/use-query-with-language'
import { ListParams } from '@/shared/types/list-params'
import { productsApi } from '../api/products-api'
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
import { Product, ProductUpdate } from '../types/products'
import { notifications } from '@mantine/notifications'

// eslint-disable-next-line react-refresh/only-export-components
const PRODUCTS = 'products'

export const useFetchProducts = (params: ListParams) => {
  const element = Object.values(params)

  return useQueryWithLanguage<ResponseWithPagination<Product[]>, HTTPError>({
    queryFn: () => productsApi.getAll(params),
    queryKey: [PRODUCTS, ...element],
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export const useFetchProduct = (productId: string | undefined) => {
  return useQuery<ResponseWithData<ProductUpdate>>({
    queryKey: ['product', productId],
    queryFn: () => productsApi.getOne(productId),
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, FormData>({
    mutationFn: productsApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS] })
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

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { productId: string | undefined; body: FormData }
  >({
    mutationFn: productsApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS] })
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
      queryClient.invalidateQueries({ queryKey: [PRODUCTS] })

      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
    onError: (error) => {
      notifications.show({
        title: 'Ошибка',
        message: error.message,
        color: 'red',
      })
    },
  })
}
