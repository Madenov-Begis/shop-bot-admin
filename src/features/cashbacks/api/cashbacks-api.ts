import { http } from '@/config/http/http'
import { ResponseWithData, ResponseWithPagination } from '@/config/http/types'
import { CashbackBody, Cashback } from '../types/cashbacks'

export const cashbacksApi = {
  getAll: async (params: {
    per_page: number
    search?: string
    page: number
  }) => {
    const { data } = await http<ResponseWithPagination<Cashback[]>>(`/cashbacks`, {
      params,
    })

    return data
  },

  show: async (cashbackId: number) => {
    const { data } = await http<ResponseWithData<Cashback>>(
      `/cashbacks/${cashbackId}`
    )

    return data
  },

  create: async (body: CashbackBody) => {
    const { data } = await http.post<{ message: string }>(
      '/cashbacks/create',
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
    const { data } = await http.patch<{ message: string }>(
      `/cashbacks/update/${cashbackId}`,
      body
    )

    return data
  },

  delete: async (cashbackId: number) => {
    const { data } = await http.delete<{ message: string }>(
      `/cashbacks/delete/${cashbackId}`
    )

    return data
  },
}
