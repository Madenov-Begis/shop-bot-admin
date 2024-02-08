import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

import { languagesApi } from '../api/languages-api'
import { Language, LanguageBody } from '../types/language'

import {
  HTTPError,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'

const LANGUAGES = 'languages'

export const useFetchLanguages = (params: ListParams) => {
  const elements = Object.values(params)

  return useQuery<ResponseWithPagination<Language[]>, HTTPError>({
    queryKey: [LANGUAGES, ...elements],
    queryFn: () => languagesApi.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export const useFetchListLanguages = () => {
  return useQuery({
    queryKey: [LANGUAGES],
    queryFn: languagesApi.list,
    staleTime: 300_000,
  })
}

export const useFetchLanguage = (languageId: number) => {
  return useQuery<ResponseWithData<Language>, HTTPError>({
    queryKey: ['language', languageId],
    queryFn: () => languagesApi.getOne(languageId),
  })
}

export const useCreateLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, LanguageBody>({
    mutationFn: languagesApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [LANGUAGES],
      })

      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { languageId: number; body: LanguageBody }
  >({
    mutationFn: languagesApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [LANGUAGES],
      })

      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useDeleteLanguange = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, number>({
    mutationFn: languagesApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [LANGUAGES],
      })

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
