import { createBrowserRouter, defer } from 'react-router-dom'
import MainLayout from '../../layouts/main-layout/main-layout'
import Products from '../../pages/products'
import { lazy } from 'react'
import { AuthRoute } from '@/features/auth/ui/auth-route'
import LoginPage from '@/pages/auth/login'
import { ProtectedRoutes } from '@/features/auth/ui/protected-routes'
import { Auth } from '@/features/auth/ui/auth'
import { CheckAuth } from '@/features/auth/utils/check-auth'

const AudiencesPage = lazy(() => import('../../pages/products/audiences'))
const CashbacksPage = lazy(() => import('../../pages/products/cashbacks'))

export const router = createBrowserRouter(
  [
    {
      element: <Auth />,
      loader: () => defer({ auth: CheckAuth() }),
      children: [
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: '/',
              element: <MainLayout />,
              children: [
                {
                  path: 'products',
                  element: <Products />,
                },
                {
                  path: 'audiences',
                  element: <AudiencesPage />,
                },
                {
                  path: 'cashbacks',
                  element: <CashbacksPage />,
                },
              ],
            },
          ],
        },

        {
          element: <AuthRoute />,
          children: [
            {
              path: '/login',
              element: <LoginPage />,
            },
          ],
        },
      ],
    },
  ],
  { basename: '/admin' }
)


