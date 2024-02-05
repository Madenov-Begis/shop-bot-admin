import { http } from '@/config/http/http'
import { loginBody } from '../types/auth-types'

export const AuthApi = {
  login: async (body: loginBody) => {
    const { data } = await http.post('/uz/auth/login', body)

    return data
  },
}
