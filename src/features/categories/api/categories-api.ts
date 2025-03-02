import { http } from '@/shared/config/http'
import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { Categories, CategoryBody } from '../types/categories'

import { SelectType } from '@/shared/types/select-type'

export const categoriesApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Categories[]>>(
      '/category',
      { params }
    )

    return data
  },

  list: async () => {
    const { data } = await http<ResponseWithData<SelectType[]>>('/category/all')

    return data
  },

  getOne: async (id: number) => {
    const { data } = await http<ResponseWithData<Categories>>(`/category/${id}`)

    return data
  },

  create: async (body: CategoryBody) => {
    const { data } = await http.post<ResponseWithMessage>('/category', body)

    return data
  },

  update: async ({ id, body }: { id: number; body: CategoryBody }) => {
    const { data } = await http.patch<ResponseWithMessage>(
      `/category/${id}`,
      body
    )

    return data
  },

  delete: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`/category/${id}`)

    return data
  },
}
