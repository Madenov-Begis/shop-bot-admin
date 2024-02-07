import Cookies from 'js-cookie'
import { COOKIES } from '@/shared/constants/cookies'
import { authApi } from '../api/auth-api'

export const checkAuth = async () => {
  const token = Cookies.get(COOKIES.TOKEN)

  if (token) {
    try {
      const user = await authApi.getMe()

      return {
        isAuth: true,
        user,
      }
    } catch (error) {
      return {
        isAuth: false,
        user: null,
      }
    }
  } else {
    return {
      isAuth: false,
      user: null,
    }
  }
}
