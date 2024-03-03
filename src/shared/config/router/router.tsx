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
const LanguagesPage = lazy(() => import('@/pages/languages/list'))
const ProductsPage = lazy(() => import('@/pages/products/list'))
const CreateProduct = lazy(() => import('@/pages/products/create'))
const UpdateProduct = lazy(() => import('@/pages/products/update'))
const CategoryPage = lazy(() => import('@/pages/categories/list'))
const UsersPage = lazy(() => import('@/pages/users/list'))

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
                    path: ROUTES.LANGUAGES,
                    element: <LanguagesPage />,
                  },
                  {
                    path: ROUTES.PRODUCTS,
                    element: <ProductsPage />,
                  },
                  {
                    path: ROUTES.CATEGORIES,
                    element: <CategoryPage />,
                  },
                  {
                    path: ROUTES.PRODUCTSCREATE,
                    element: <CreateProduct />,
                  },
                  {
                    path: ROUTES.PRODUCTSUPDATE,
                    element: <UpdateProduct />,
                  },
                  {
                    path: ROUTES.USERS,
                    element: <UsersPage />,
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
