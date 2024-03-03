import { http } from '@/shared/config/http'
import { ResponseWithPagination } from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { Users } from '../types/users-type'

export const usersApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Users[]>>('/customer', {
      params,
    })

    return data
  },
}
