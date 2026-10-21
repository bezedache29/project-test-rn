import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { useMemo } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { queryClient } from '@/config/queryClient'
import RootNavigator from '@/navigation/RootNavigator'
import { useColors } from '@/theme'

export default function App() {
  const isDark = useColorScheme() === 'dark'
  const colors = useColors()

  // Keeps React Navigation backgrounds and borders in line with our palette.
  const navigationTheme = useMemo<Theme>(() => {
    const base = isDark ? DarkTheme : DefaultTheme
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.background,
        text: colors.foreground,
        border: colors.border,
        notification: colors.destructive,
      },
    }
  }, [isDark, colors])

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={navigationTheme}>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
