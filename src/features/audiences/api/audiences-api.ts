import { http } from '@/shared/config/http'
import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { Audience, AudienceBody } from '../types/audience'
import { ListParams } from '@/shared/types/list-params'

export const audiencesApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Audience[]>>(
      '/audiences',
      {
        params,
      }
    )

    return data
  },

  show: async (audienceId: number) => {
    const { data } = await http<ResponseWithData<Audience>>(
      `/audiences/${audienceId}`
    )

    return data
  },

  create: async (body: AudienceBody) => {
    const { data } = await http.post<ResponseWithMessage>(
      '/audiences/create',
      body
    )

    return data
  },

  update: async ({
    audienceId,
    body,
  }: {
    audienceId?: number
    body: AudienceBody
  }) => {
    const { data } = await http.patch<ResponseWithMessage>(
      `/audiences/update/${audienceId}`,
      body
    )

    return data
  },

  delete: async (audienceId: number) => {
    const { data } = await http.delete<ResponseWithMessage>(
      `/audiences/delete/${audienceId}`
    )

    return data
  },
}
