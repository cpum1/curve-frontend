import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type Persister, PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import React, { ReactNode } from 'react'

type QueryProviderWrapperProps = {
  children: ReactNode
  persister: Persister | null
  queryClient: QueryClient
}

export function QueryProvider({ children, persister, queryClient }: QueryProviderWrapperProps) {
  // children = (<>{children}<ReactQueryDevtools buttonPosition="bottom-left" /></>)
  if (persister) {
    return (
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        {children}
      </PersistQueryClientProvider>
    )
  }
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
