import { useQueryWithLanguage } from '@/features/languages/hooks/use-query-with-language'
import { ListParams } from '@/shared/types/list-params'
import { catalogApi } from '../api/catalog-api'
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
import { Catalog, CatalogBody } from '../types/catalog-type'
import { notifications } from '@mantine/notifications'

const CATALOGS = 'catalogs'

export const useFetchCatalogs = (params: ListParams) => {
  const elements = Object.values(params)

  return useQueryWithLanguage<ResponseWithPagination<Catalog[]>, HTTPError>({
    queryKey: [CATALOGS, ...elements],
    queryFn: () => catalogApi.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export const useFetchCatalog = (catalogId: number) => {
  return useQuery<ResponseWithData<Catalog>, HTTPError>({
    queryKey: ['catalogs', catalogId],
    queryFn: () => catalogApi.getDetail(catalogId),
  })
}

export const useCreateCatalog = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, CatalogBody>({
    mutationFn: catalogApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CATALOGS] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useUpdateCatalog = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { cashbackId: number; body: CatalogBody }
  >({
    mutationFn: catalogApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CATALOGS] })

      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useDeleteCatalog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: catalogApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [CATALOGS] })

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
