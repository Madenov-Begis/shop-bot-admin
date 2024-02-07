import { http } from '../../../config/http/http'
import { ResponseWithData, ResponseWithPayload } from '../../../config/http/types'
import { Audience, AudienceBody } from '../types/audience'

export const audiencesApi = {
  getAll: async (params: {
    page: number
    per_page: number
    search?: string
  }) => {
    const { data } = await http<ResponseWithData<Audience[]>>(
      '/audiences',
      {
        params,
      }
    )

    return data
  },

  show: async (audienceId: number) => {
    const { data } = await http<ResponseWithPayload<Audience>>(
      `/audiences/${audienceId}`
    )

    return data
  },

  create: async (body: AudienceBody) => {
    const { data } = await http.post<{ message: string }>(
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
    const { data } = await http.patch<{ message: string }>(
      `/audiences/update/${audienceId}`,
      body
    )

    return data
  },

  delete: async (audienceId: number) => {
    const { data } = await http.delete<{ message: string }>(
      `/audiences/delete/${audienceId}`
    )

    return data
  },
}
