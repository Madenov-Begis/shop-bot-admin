import { ListParams } from '@/shared/types/list-params'
import { useQuery } from '@tanstack/react-query'
import { usersApi } from '../api/users-api'
import { HTTPError, ResponseWithPagination } from '@/shared/types/http'
import { Users } from '../types/users-type'

export const useFetchUsers = (params: ListParams) => {
  return useQuery<ResponseWithPagination<Users[]>, HTTPError>({
    queryKey: ['users', params],
    queryFn: () => usersApi.getAll(params),
  })
}
