import { http } from '@/shared/config/http'

import { LoginBody } from '../types/login'
import { User } from '../types/user'

export const authApi = {
  login: async (body: LoginBody) => {
    const { data } = await http.post<User>('/auth/login', body)

    return data
  },

  getMe: async () => {
    const { data } = await http<User>('/auth/me')

    return data
  },

  logout: async () => {
    const { data } = await http.post('/auth/log-out')

    return data
  },
}
