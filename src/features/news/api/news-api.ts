import { http } from '@/shared/config/http'
import { ResponseWithData, ResponseWithPagination } from '@/shared/types/http'
import { News, NewsBody } from '../types/news'
import { ListParams } from '@/shared/types/list-params'

export const newsApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<News[]>>('/news/index', {
      params,
    })

    return data
  },

  getOne: async (newId: number) => {
    const { data } = await http<ResponseWithData<News>>(`/news/edit/${newId}`)

    return data
  },

  create: async (body: NewsBody) => {
    const { data } = await http.post('news/create', body)

    return data
  },
}
