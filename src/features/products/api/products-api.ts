import { http } from '@/shared/config/http'
import {
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ProductBody, Products } from '../types/products'
import { ListParams } from '@/shared/types/list-params'

export const productsApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Products[]>>(
      '/product',
      { params }
    )

    return data
  },

  create: async (body: ProductBody) => {
    const { data } = await http.post<ResponseWithMessage>('/product', body, {
      headers: {
        ['Content-Type']: 'multipart/form-data',
      },
    })

    return data
  },

  getOne: async (id: string | undefined) => {
    const { data } = await http<Products>(`/product/${id}`)

    return data
  },

  update: async ({ id, body }: { id: string | undefined; body: ProductBody }) => {
    const { data } = await http.post<ResponseWithMessage>(
      `/product/${id}`,
      body
    )

    return data
  },

  delete: async (id: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`/product/${id}`)

    return data
  },
}
