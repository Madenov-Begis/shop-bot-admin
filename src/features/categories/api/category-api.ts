import { http } from '@/shared/config/http'
import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { Category, CategoryBody } from '../types/category'

export const categoryApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Category[]>>(
      '/categories',
      { params }
    )

    return data
  },

  getOne: async (categoryId: number) => {
    const { data } = await http<ResponseWithData<Category>>(
      `categories/${categoryId}`
    )

    return data
  },

  create: async (body: CategoryBody) => {
    const { data } = await http.post<ResponseWithMessage>(
      '/categories/create',
      body
    )

    return data
  },

  update: async ({
    categoryId,
    body,
  }: {
    categoryId: number
    body: CategoryBody
  }) => {
    const { data } = await http.patch(`/categories/update/${categoryId}`, body)

    return data
  },

  delete: async (categoryId: number) => {
    const { data } = await http.delete(`/categories/delete/${categoryId}`)

    return data
  },

  list: async () => {
    const { data } = await http('/categories/list')

    return data
  },
}
