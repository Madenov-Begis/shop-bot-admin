import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth-context/use-auth'

export const AuthRoute = () => {
  const { isAuth } = useAuth()

  return !isAuth ? <Outlet /> : <Navigate to={'/'} replace={true} />
}
