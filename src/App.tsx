import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import 'mantine-react-table/styles.css'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from './config/theme/theme'
import { RouterProvider } from 'react-router-dom'
import { router } from './config/routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Notifications />
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
