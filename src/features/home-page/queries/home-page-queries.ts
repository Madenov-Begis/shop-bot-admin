import { useQuery } from '@tanstack/react-query'
import { homePageAPi } from '../api/home-page-api'

export const useUserChart = ({
    start_date,
    end_date,
  }: {
    start_date: string
    end_date: string
  }) => {
  return useQuery({
    queryKey: ['users-chart', start_date, end_date],
    queryFn: () => homePageAPi.getUserStatistics({ start_date, end_date }),
    staleTime: 30_000,
  })
}
