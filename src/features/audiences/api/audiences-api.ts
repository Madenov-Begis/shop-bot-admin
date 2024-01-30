import { http } from '../../../config/http/http'
import { ResponseWithPayload } from '../../../config/http/types'
import { Audience, AudienceBody } from '../types/audience'

export const audiencesApi = {
  getAll: async () => {
    const { data } = await http<ResponseWithPayload<Audience[]>>(
      '/uz/audiences'
    )

    return data
  },

  create: async (body: AudienceBody) => {
    const { data } = await http.post<{ message: string }>(
      '/uz/audiences/create',
      body
    )

    return data
  },

  update: async ({
    audienceId,
    body,
  }: {
    audienceId: number
    body: AudienceBody
  }) => {
    const { data } = await http.patch<{ message: string }>(
      `uz/audiences/update/${audienceId}`,
      body
    )

    return data
  },

  delete: async (audienceId: number) => {
    const { data } = await http.delete<{ message: string }>(
      `uz/audiences/delete/${audienceId}`
    )

    return data
  },
}
