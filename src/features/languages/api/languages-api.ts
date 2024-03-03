import { http } from '@/shared/config/http'
import { Language, LanguageBody } from '../types/language'
import {
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'

const RESOURCE = '/locale'

export const languagesApi = {
  getAll: async (params?: ListParams) => {
    const { data } = await http<ResponseWithPagination<Language[]>>(RESOURCE, {
      params,
    })

    return data
  },

  getOne: async (languageId: number) => {
    const { data } = await http<Language>(`${RESOURCE}/${languageId}`)

    return data
  },

  create: async (body: LanguageBody) => {
    const { data } = await http.post<ResponseWithMessage>(`${RESOURCE}`, body)

    return data
  },

  update: async ({
    languageId,
    body,
  }: {
    languageId: number
    body: LanguageBody
  }) => {
    const { data } = await http.patch<Language>(
      `${RESOURCE}/${languageId}`,
      body
    )

    return data
  },

  delete: async (languageId: number) => {
    const { data } = await http.delete(`${RESOURCE}/${languageId}`)

    return data
  },
}
