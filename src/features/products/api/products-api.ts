import { http } from '@/shared/config/http'
import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'
import { Product, ProductUpdate } from '../types/products'

export const productsApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Product[]>>('products', {
      params,
    })

    return data
  },

  getOne: async (productId: string | undefined) => {
    const { data } = await http<ResponseWithData<ProductUpdate>>(
      `/products/edit/${productId}`
    )

    return data
  },

  create: async (body: FormData) => {
    const { data } = await http.post('/products/create', body, {
      headers: {
        ['Content-Type']: 'multipart/form-data',
      },
    })

    return data
  },

  update: async ({
    productId,
    body,
  }: {
    productId: string | undefined
    body: FormData
  }) => {
    const { data } = await http.post<ResponseWithMessage>(
      `/products/update/${productId}`,
      body
    )

    return data
  },

  delete: async (productId: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `/products/delete/${productId}`
    )

    return data
  },
}
