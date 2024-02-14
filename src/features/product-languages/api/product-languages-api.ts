import { http } from '@/shared/config/http'
import { ListParams } from '@/shared/types/list-params'
import {
  ProductLanguages,
  ProductLanguagesBody,
} from '../types/product-languages'
import {
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'

export const productLanguagesApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<ProductLanguages[]>>(
      '/product-languages',
      { params }
    )

    return data
  },

  getOne: async (productLanguagsId: number) => {
    const { data } = await http<ResponseWithPagination<ProductLanguages>>(
      `/product-languages/${productLanguagsId}`
    )

    return data
  },

  create: async (body: ProductLanguagesBody) => {
    const { data } = await http.post<ResponseWithMessage>(
      '/product-languages/create',
      body
    )

    return data
  },

  update: async ({
    productLanguageId,
    body,
  }: {
    productLanguageId: number
    body: ProductLanguagesBody
  }) => {
    const { data } = await http.patch<ResponseWithMessage>(
      `/product-languages/update/${productLanguageId}`,
      body
    )

    return data
  },

  delete: async (productLanguageId: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `/product-languages/delete/${productLanguageId}`
    )

    return data
  },
}
