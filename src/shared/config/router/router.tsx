import { createBrowserRouter, defer } from 'react-router-dom'

import { AppProvider } from '@/providers/app-provider'

import { Auth } from '@/features/auth/ui/auth'
import { ProtectedRoutes } from '@/features/auth/ui/protected-routes'
import { AuthRoute } from '@/features/auth/ui/auth-route'

import { MainLayout } from '@/shared/layouts/main-layout/main-layout'

import { checkAuth } from '@/features/auth/utils/check-auth'
import { ROUTES } from '../../constants/routes'
import { AuthLayout } from '@/shared/layouts/auth-layout/auth-layout'

import LoginPage from '@/pages/auth/login'
import HomePage from '@/pages/home-page'
import LanguagesPage from '@/pages/languages/list'
import ProductsPage from '@/pages/products/list'
import CreateProduct from '@/pages/products/create'
import UpdateProduct from '@/pages/products/update'
import CategoryPage from '@/pages/categories/list'
import UsersPage from '@/pages/users/list'

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
                    path: '',
                    element: <HomePage />,
                  },
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
