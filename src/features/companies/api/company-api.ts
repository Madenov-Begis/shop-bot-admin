import { http } from '@/shared/config/http'
import { ResponseWithData, ResponseWithPagination } from '@/shared/types/http'
import { Company, CompanyBody, CompanyDeatil } from '../types/company'
import { ListParams } from '@/shared/types/list-params'
import { SelectType } from '@/shared/types/select-type'

export const companyApi = {
  getAll: async (params: ListParams) => {
    const { data } = await http<ResponseWithPagination<Company[]>>(
      '/companies',
      { params }
    )

    return data
  },

  getOne: async (companyId: number) => {
    const { data } = await http<ResponseWithData<CompanyDeatil>>(
      `/companies/${companyId}`
    )

    return data
  },

  create: async (body: CompanyBody) => {
    const { data } = await http.post('/companies/create', body)

    return data
  },

  update: async ({
    companyId,
    body,
  }: {
    companyId: number
    body: CompanyBody
  }) => {
    const { data } = await http.patch(`/companies/update/${companyId}`, body)

    return data
  },

  delete: async (companyId: number) => {
    const { data } = await http.delete(`/companies/delete/${companyId}`)

    return data
  },

  list: async () => {
    const { data } = await http<ResponseWithData<SelectType[]>>(
      '/companies/list'
    )

    return data
  },
}
