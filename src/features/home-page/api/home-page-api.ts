import { http } from '@/shared/config/http'
import { UserChart } from '../types/home-page'
import { ResponseWithData } from '@/shared/types/http'

export const homePageAPi = {
  getUserStatistics: async ({
    start_date,
    end_date,
  }: {
    start_date: string
    end_date: string
  }) => {
    const { data } = await http<ResponseWithData<UserChart[]>>('/users/chart', {
      params: {
        start_date,
        end_date,
      },
    })

    return data
  },
}
