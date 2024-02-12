import { http } from '@/shared/config/http'
import { Catalog, CatalogBody } from '../types/catalog-type'
import { ResponseWithData, ResponseWithMessage, ResponseWithPagination } from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'

export const catalogApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Catalog[]>>(
      `/catalogs`,
      { params }
    )

    return data
  },

  getDetail: async (catalogId: number) => {
    const { data } = await http<ResponseWithData<Catalog>>(`/catalogs/${catalogId}`)

    return data
  },

  create: async (body: CatalogBody) => {
    const { data } = await http.post<ResponseWithMessage>(
      '/catalogs/create',
      body
    )

    return data
  },

   update: async ({
    catalogId,
    body,
  }: {
    catalogId: number
    body: CatalogBody
  }) => {
    const { data } = await http.patch<ResponseWithMessage>(`/catalogs/update/${catalogId}`, body)

    return data
  },

  delete: async (catalogId: number) => {
    const { data } = await http.delete<ResponseWithMessage>(`/catalogs/delete/${catalogId}`)

    return data
  },
}
