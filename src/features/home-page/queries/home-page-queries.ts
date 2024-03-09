import { useQuery } from '@tanstack/react-query'
import { homePageAPi } from '../api/home-page-api'

export const useUserChart = ({
  start,
  end,
}: {
  start: string
  end: string
}) => {
  return useQuery({
    queryKey: ['users-chart', start, end],
    queryFn: () => homePageAPi.getUserStatistics({ start, end }),
    staleTime: 30_000,
  })
}
