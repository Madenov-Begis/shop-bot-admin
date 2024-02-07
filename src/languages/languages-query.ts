import { useQuery } from '@tanstack/react-query'
import { languagesApi } from './languages-api'
import { ResponseWithData } from '../http/types'
import { LangsType } from './types'

export const useFetchLanguages = () => {
  return useQuery<ResponseWithData<LangsType[]>>({
    queryKey: ['languages'],
    queryFn: languagesApi.getLanguages,
    staleTime: 300_000,
  })
}
