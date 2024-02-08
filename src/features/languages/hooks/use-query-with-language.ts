import { QueryClient, UseQueryOptions, useQuery } from '@tanstack/react-query'
import { useGetLanguage } from '@/shared/hooks/use-get-current-language'

export const useQueryWithLanguage = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  options: UseQueryOptions<TQueryFnData, TError, TData>,
  queryClient?: QueryClient
) => {
  const lang = useGetLanguage()

  return useQuery(
    {
      ...options,
      queryKey: [...options.queryKey, lang],
    },
    queryClient
  )
}
