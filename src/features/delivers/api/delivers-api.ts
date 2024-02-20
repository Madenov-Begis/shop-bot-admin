import { http } from '@/shared/config/http'
import { ListParams } from '@/shared/types/list-params'
import { Delivers, DeliversBody } from '../types/delivers'
import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { SelectType } from '@/shared/types/select-type'

export const deliversApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Delivers[]>>(
      '/delivers',
      { params }
    )

    return data
  },

  getOne: async (deliverId: number) => {
    const { data } = await http<ResponseWithData<Delivers>>(
      `delivers/${deliverId}`
    )

    return data
  },

  create: async (body: DeliversBody) => {
    const { data } = await http.post<ResponseWithMessage>(
      '/delivers/create',
      body
    )

    return data
  },

  update: async ({
    deliverId,
    body,
  }: {
    deliverId: number
    body: DeliversBody
  }) => {
    const { data } = await http.patch<ResponseWithMessage>(
      `/delivers/update/${deliverId}`,
      body
    )

    return data
  },

  delete: async (deliverId: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `/delivers/delete/${deliverId}`
    )

    return data
  },

  list: async () => {
    const { data } = await http<ResponseWithData<SelectType[]>>('/delivers/list')

    return data
  },
}
