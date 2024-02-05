import { Await, Outlet, useLoaderData } from 'react-router-dom'
import { AuthProvider } from '../auth-context/auth-provider'
import { Suspense } from 'react'
import { Loader } from '@mantine/core'

export const Auth = () => {
  //@ts-ignore
  const { auth } = useLoaderData()

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={auth}
        children={(auth) => (
          <AuthProvider authored={auth}>
            <Outlet />
          </AuthProvider>
        )}
      />
    </Suspense>
  )
}
