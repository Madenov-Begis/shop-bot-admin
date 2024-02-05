import { useContext } from 'react'
import { AuthContext } from './auth-provider'

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Оберните в AuthProvider свое приложение.')
  }

  return context
}
