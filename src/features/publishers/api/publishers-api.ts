import { http } from '@/shared/config/http'
import { ListParams } from '@/shared/types/list-params'
import { Publisher, PublisherBody, PublisherDetail } from '../types/publishers'
import {
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'

export const publishersApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Publisher[]>>(
      '/publishers',
      { params }
    )

    return data
  },

  getOne: async (publisherId: number) => {
    const { data } = await http<ResponseWithPagination<PublisherDetail>>(
      `/publishers/${publisherId}`
    )

    return data
  },

  create: async (body: PublisherBody) => {
    const { data } = await http.post<ResponseWithMessage>(
      '/publishers/create',
      body
    )

    return data
  },

  update: async ({
    publisherId,
    body,
  }: {
    publisherId: number
    body: PublisherBody
  }) => {
    const { data } = await http.patch<ResponseWithMessage>(
      `/publishers/update/${publisherId}`,
      body
    )

    return data
  },

  delete: async (publisherId: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `/publishers/delete/${publisherId}`
    )

    return data
  },
}
