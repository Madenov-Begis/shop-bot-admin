import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../../layouts/main-layout/main-layout'
import Products from '../../pages/products'
// import Audiences from '../../pages/audiences/audiences'
import { lazy } from 'react'

const AudiencesPage = lazy(() => import('../../pages/products/audiences'))
const CashbacksPage = lazy(() => import('../../pages/products/cashbacks'))

export const router = createBrowserRouter([
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
])
