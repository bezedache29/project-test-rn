import { focusManager, QueryClient } from '@tanstack/react-query'
import { AppState, type AppStateStatus } from 'react-native'

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
})

// Recharge les données quand l'app revient au premier plan
AppState.addEventListener('change', (status: AppStateStatus) => {
  focusManager.setFocused(status === 'active')
})
