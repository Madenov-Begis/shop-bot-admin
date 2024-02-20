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
const CategoriesPage = lazy(() => import('@/pages/categories/list'))
const CompaniesPage = lazy(() => import('@/pages/companies/list'))
const DeliversPage = lazy(() => import('@/pages/delivers/list'))
const PublishersPage = lazy(() => import('@/pages/publishers/list'))
const ProductLanguagesPage = lazy(
  () => import('@/pages/product-languages/list')
)
const ProductsPage = lazy(() => import('@/pages/products/list'))
const CreateProduct = lazy(() => import('@/pages/products/create'))
const UpdateProduct = lazy(() => import('@/pages/products/update'))

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
                    path: ROUTES.PRODUCTS,
                    element: <ProductsPage />,
                  },
                  {
                    path: ROUTES.CREATEPRODUCT,
                    element: <CreateProduct />,
                  },
                  {
                    path: ROUTES.UPDATEPRODUCT,
                    element: <UpdateProduct />,
                  },
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
                  {
                    path: ROUTES.CATEGORIES,
                    element: <CategoriesPage />,
                  },
                  {
                    path: ROUTES.COMPANIES,
                    element: <CompaniesPage />,
                  },
                  {
                    path: ROUTES.DELIVERS,
                    element: <DeliversPage />,
                  },
                  {
                    path: ROUTES.PUBLISHERS,
                    element: <PublishersPage />,
                  },
                  {
                    path: ROUTES.PRODUCTLANGUAGES,
                    element: <ProductLanguagesPage />,
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
