import { http } from '@/shared/config/http'
import { Language, LanguageBody } from '../types/language'
import {
  ResponseWithData,
  ResponseWithMessage,
  ResponseWithPagination,
} from '@/shared/types/http'
import { ListParams } from '@/shared/types/list-params'

const RESOURCE = '/languages'

export const languagesApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Language[]>>(RESOURCE, {
      params,
    })

    return data
  },

  list: async () => {
    const { data } = await http<ResponseWithData<Language[]>>(
      `${RESOURCE}/list`
    )

    return data
  },

  getOne: async (languageId: number) => {
    const { data } = await http<ResponseWithData<Language>>(
      `${RESOURCE}/${languageId}`
    )

    return data
  },

  create: async (body: LanguageBody) => {
    const { data } = await http.post<ResponseWithMessage>(
      `${RESOURCE}/create`,
      body
    )

    return data
  },

  update: async ({
    languageId,
    body,
  }: {
    languageId: number
    body: LanguageBody
  }) => {
    const { data } = await http.patch<ResponseWithMessage>(
      `${RESOURCE}/update/${languageId}`,
      body
    )

    return data
  },

  delete: async (languageId: number) => {
    const { data } = await http.delete(`${RESOURCE}/delete/${languageId}`)

    return data
  },
}
