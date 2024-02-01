import { useQuery } from '@tanstack/react-query'
import { languagesApi } from './languages-api'
import { ResponseWithData, ResponseWithPayload } from '../http/types'
import { LangsType } from './types'

export const useFetchLanguages = () => {
  return useQuery<ResponseWithPayload<LangsType[]>>({
    queryKey: ['languages'],
    queryFn: languagesApi.getLanguages,
    retry: false,
    staleTime: 300_000,
  })
}
