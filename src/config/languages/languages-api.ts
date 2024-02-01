import { http } from '../http/http'
import { ResponseWithPayload } from '../http/types'
import { LangsType } from './types'

export const languagesApi = {
  getLanguages: async () => {
    const { data } = await http<ResponseWithPayload<LangsType[]>>(
      '/uz/languages'
    )

    return data
  },
}
