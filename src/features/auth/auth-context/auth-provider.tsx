import { PropsWithChildren, useState } from 'react'
import { notifications } from '@mantine/notifications'

import Cookies from 'js-cookie'

import { AuthContext } from './auth-context'

import { authApi } from '../api/auth-api'

import { User } from '../types/user'
import { LoginBody } from '../types/login'

// import { COOKIES } from '@/shared/constants/cookies'

interface AuthProviderProps extends PropsWithChildren {
  authored: boolean
  authorizedUser: User | null
}

export const AuthProvider = (props: AuthProviderProps) => {
  const { authored, authorizedUser, children } = props

  const [isAuth, setIsAuth] = useState(authored)
  const [user, setUser] = useState<User | null>(authorizedUser)

  const login = async (body: LoginBody) => {
    try {
      const { data } = await authApi.login(body)
      // Cookies.set(COOKIES.TOKEN, data.token, {
      //   expires: 7,
      // })

      notifications.show({
        title: 'Успешно',
        message: 'Успешно',
        color: 'green',
      })

      setIsAuth(true)
      setUser(data.user)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const logout = () => {
    authApi.logout().finally(() => {
      notifications.show({
        title: 'Успешно',
        message: 'Вы вышли из системы',
        color: 'green',
      })
      // Cookies.remove(COOKIES.TOKEN)
      setIsAuth(false)
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider value={{ login, isAuth, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}
