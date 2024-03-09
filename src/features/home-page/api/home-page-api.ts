import { http } from '@/shared/config/http'
import { UserCart } from '../types/home-page'

export const homePageAPi = {
  getUserStatistics: async ({ start, end }: { start: string; end: string }) => {
    const { data } = await http<UserCart[]>('/customer/chart', {
      params: {
        start,
        end,
      },
    })

    return data
  },
}
