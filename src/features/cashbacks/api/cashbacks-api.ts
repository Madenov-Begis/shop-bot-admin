import { http } from '@/config/http/http'
import { ResponseWithData, ResponseWithPayload } from '@/config/http/types'
import { CashbackBody, Cashback } from '../types/cashbacks'

export const cashbacksApi = {
  getAll: async (params: {
    per_page: number
    search?: string
    page: number
    lang?: string
  }) => {
    const { data } = await http<ResponseWithData<Cashback[]>>(
      `/${params.lang}/cashbacks`,
      {
        params,
      }
    )

    return data
  },

  show: async (cashbackId: number) => {
    const { data } = await http<ResponseWithPayload<Cashback>>(
      `/uz/cashbacks/${cashbackId}`
    )

    return data
  },

  create: async (body: CashbackBody) => {
    const { data } = await http.post<{ message: string }>(
      '/uz/cashbacks/create',
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
      `/uz/cashbacks/update/${cashbackId}`,
      body
    )

    return data
  },

  delete: async (cashbackId: number) => {
    const { data } = await http.delete<{ message: string }>(
      `/uz/cashbacks/delete/${cashbackId}`
    )

    return data
  },
}
