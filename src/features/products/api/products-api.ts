import { http } from '@/shared/config/http'
import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import {  Products } from '../types/products'
import { ListParams } from '@/shared/types/list-params'

export const productsApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Products[]>>(
      '/product',
      { params }
    )

    return data
  },

  create: async (body: FormData) => {
    const { data } = await http.post<ResponseWithMessage>('/product', body, {
      headers: {
        ['Content-Type']: 'multipart/form-data',
      },
    })

    return data
  },

  getOne: async (id: string | undefined) => {
    const { data } = await http<ResponseWithData<Products>>(`/product/${id}`)

    return data
  },

  update: async ({ id, body }: { id: string | undefined; body: FormData }) => {
    const { data } = await http.post<ResponseWithMessage>(
      `/product/update/${id}`,
      body
    )

    return data
  },

  delete: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`/product/${id}`)

    return data
  },
}
