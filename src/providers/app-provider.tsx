import { Outlet } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'

import { queryClient } from '@/shared/config/query-client'
import { theme } from '@/shared/config/theme'
import { customModals } from '@/shared/ui/custom-modals/custom-modals'

export const AppProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MantineProvider theme={theme}>
        <ModalsProvider modals={customModals}>
          <Notifications position="top-right" />
          <Outlet />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
