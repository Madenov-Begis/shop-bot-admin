import { RouterProvider } from 'react-router-dom'
import { router } from '@/shared/config/router'

export const App = () => {
  return <RouterProvider router={router} />
}
