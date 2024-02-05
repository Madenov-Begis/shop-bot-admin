import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth-context/use-auth'

export const ProtectedRoutes = () => {
  const { isAuth } = useAuth()

  return isAuth ? <Outlet /> : <Navigate to={'/login'} replace={true} />
}
