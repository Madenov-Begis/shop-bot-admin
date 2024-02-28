import { http } from '@/shared/config/http'

import { LoginResponse, LoginBody } from '../types/login'
import { User } from '../types/user'

import { ResponseWithData, ResponseWithMessage } from '@/shared/types/http'

export const authApi = {
  login: async (body: LoginBody) => {
    const { data } = await http.post<ResponseWithData<LoginResponse>>(
      '/auth/login',
      body
    )

    return data
  },

  getMe: async () => {
    const { data } = await http<User>('/auth/me')

    return data
  },

  logout: async () => {
    const { data } = await http.post<ResponseWithMessage>('/auth/log-out')

    return data
  },
}
