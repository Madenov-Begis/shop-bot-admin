import { useQueryWithLanguage } from '@/features/languages/hooks/use-query-with-language'
import {
  HTTPError,
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { companyApi } from '../api/company-api'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Company, CompanyBody, CompanyDeatil } from '../types/company'
import { notifications } from '@mantine/notifications'
import { SelectType } from '@/shared/types/select-type'

const COMPANIES = 'companies'

export const useFetchCompanies = (params: ListParams) => {
  const elements = Object.values(params)

  return useQueryWithLanguage<ResponseWithPagination<Company[]>, HTTPError>({
    queryKey: [COMPANIES, ...elements],
    queryFn: () => companyApi.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export const useFetchCompanyList = () => {
  return useQuery<ResponseWithData<SelectType[]>>({
    queryKey: ['company-list'],
    queryFn: companyApi.list,
    staleTime: 30_000,
  })
}

export const useFetchCompany = (companyId: number) => {
  return useQuery<ResponseWithData<CompanyDeatil>>({
    queryKey: ['company', companyId],
    queryFn: () => companyApi.getOne(companyId),
  })
}

export const useCreateCompany = () => {
  const queryClient = useQueryClient()

  return useMutation<ResponseWithMessage, HTTPError, CompanyBody>({
    mutationFn: companyApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useUpdateCompany = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseWithMessage,
    HTTPError,
    { companyId: number; body: CompanyBody }
  >({
    mutationFn: companyApi.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export const useDeleteCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: companyApi.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES] })
      notifications.show({
        title: 'Успешно',
        message: data.message,
        color: 'green',
      })
    },
    onError: (data) => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES] })
      notifications.show({
        title: 'Ошибка',
        message: data.message,
        color: 'red',
      })
    },
  })
}
