import { notifyManager, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

// Les mises à jour de React Query passent en microtâche : évite les warnings act()
notifyManager.setScheduler((callback) => Promise.resolve().then(callback))

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
}

export function makeWrapper(queryClient = makeQueryClient()) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}
