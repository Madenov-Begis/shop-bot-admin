import { http } from '@/shared/config/http'
import {
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { CategoryBody, DynamicDataItem } from '../types/categories'
import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export const categoriesApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<DynamicDataItem[]>>(
      '/category',
      { params }
    )

    return data
  },

  list: async () => {
    const { data } = await http<DynamicDataItem[]>('/category/all')

    return data
  },

  getOne: async (id: number) => {
    const { data } = await http<FieldWithLanguages>(`/category/${id}`)

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
