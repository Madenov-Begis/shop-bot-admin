import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'
import { loginBody } from '../types/auth-types'
import { AuthApi } from '../api/auth-api'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

interface AuthProviderProps {
  children: ReactNode
  authored: boolean
}

export interface AuthContext {
  isAuth: boolean
  login: (body: loginBody) => Promise<void>
  logout: () => void
  setIsAuth: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<null | AuthContext>(null)

export const AuthProvider = ({ children, authored }: AuthProviderProps) => {
  const navigate = useNavigate()

  const [isAuth, setIsAuth] = useState(authored)

  const login = async (body: loginBody) => {
    try {
      const { data } = await AuthApi.login(body)

      Cookies.set('token', data, {
        expires: 7,
      })

      setIsAuth(true)
      navigate('/', { replace: true })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setIsAuth(false)
  }

  return (
    <AuthContext.Provider value={{ login, isAuth, setIsAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
