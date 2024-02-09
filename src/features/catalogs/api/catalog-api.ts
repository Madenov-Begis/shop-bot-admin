import { http } from '@/shared/config/http'
import { Catalog, CatalogBody } from '../types/catalog-type'
import { ResponseWithPagination } from '@/shared/types/http'

export const CatalogApi = {
  getAll: async () => {
    const { data } = await http<ResponseWithPagination<Catalog[]>>(`/catalogs`)

    return data
  },

  getDetail: async (catalogId: number) => {
    const { data } = await http(`/catalogs/${catalogId}`)

    return data
  },

  create: async (body: CatalogBody) => {
    const { data } = await http.post<{ message: string }>(
      '/catalogs/create',
      body
    )

    return data
  },

  update: async ({
    cashbackId,
    body,
  }: {
    cashbackId: number
    body: CatalogBody
  }) => {
    const { data } = await http.post(`/catalogs/update/${cashbackId}`, body)

    return data
  },

  delete: async (catalogId: number) => {
    const { data } = await http(`/catalogs/delete/${catalogId}`)

    return data
  },
}
