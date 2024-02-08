import { http } from '@/shared/config/http'
import { Cashback, CashbackBody } from '../types/cashbacks'
import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'

const RESOURCE = '/cashbacks'

export const cashbacksApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Cashback[]>>(RESOURCE, {
      params,
    })

    return data
  },

  getOne: async (cashbackId: number) => {
    const { data } = await http<ResponseWithData<Cashback>>(
      `${RESOURCE}/${cashbackId}`
    )

    return data
  },

  create: async (body: CashbackBody) => {
    const { data } = await http.post<ResponseWithMessage>(
      `${RESOURCE}/create`,
      body
    )

    return data
  },

  update: async ({
    cashbackId,
    body,
  }: {
    cashbackId: number
    body: CashbackBody
  }) => {
    const { data } = await http.patch<ResponseWithMessage>(
      `${RESOURCE}/update/${cashbackId}`,
      body
    )

    return data
  },

  delete: async (cashbackId: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `${RESOURCE}/delete/${cashbackId}`
    )

    return data
  },
}
