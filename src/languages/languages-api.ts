import { http } from '../shared/config/http/http'
import { ResponseWithData } from '../http/types'
import { LangsType } from './types'

export const languagesApi = {
  getLanguages: async () => {
    const { data } = await http<ResponseWithData<LangsType[]>>(
      '/languages'
    )

    return data
  },
}
