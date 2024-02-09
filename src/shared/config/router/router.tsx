import { lazy } from 'react'
import { createBrowserRouter, defer } from 'react-router-dom'

import { AppProvider } from '@/providers/app-provider'

import { Auth } from '@/features/auth/ui/auth'
import { ProtectedRoutes } from '@/features/auth/ui/protected-routes'
import { AuthRoute } from '@/features/auth/ui/auth-route'

import { MainLayout } from '@/shared/layouts/main-layout/main-layout'

import { checkAuth } from '@/features/auth/utils/check-auth'
import { ROUTES } from '../../constants/routes'
import { AuthLayout } from '@/shared/layouts/auth-layout/auth-layout'

const LoginPage = lazy(() => import('@/pages/auth/login'))
const AudiencesPage = lazy(() => import('@/pages/audiences/list'))
const CashbacksPage = lazy(() => import('@/pages/cashbacks/list'))
const LanguagesPage = lazy(() => import('@/pages/languages/list'))
const CatalogsPage = lazy(() => import('@/pages/catalogs/list'))

export const router = createBrowserRouter([
  {
    element: <AppProvider />,
    children: [
      {
        element: <Auth />,
        loader: () => defer({ auth: checkAuth() }),
        children: [
          {
            element: <ProtectedRoutes />,
            children: [
              {
                path: ROUTES.HOME,
                element: <MainLayout />,
                children: [
                  {
                    path: ROUTES.AUDIENCES,
                    element: <AudiencesPage />,
                  },
                  {
                    path: ROUTES.CASHBACKS,
                    element: <CashbacksPage />,
                  },
                  {
                    path: ROUTES.LANGUAGES,
                    element: <LanguagesPage />,
                  },
                  {
                    path: ROUTES.CATALOGS,
                    element: <CatalogsPage />,
                  },
                ],
              },
            ],
          },
          {
            element: <AuthRoute />,
            children: [
              {
                element: <AuthLayout />,
                children: [
                  {
                    path: ROUTES.LOGIN,
                    element: <LoginPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
])
