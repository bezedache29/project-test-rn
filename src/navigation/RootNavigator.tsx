import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'

import type { RootStackParamList } from '@/navigation/types'
import HomeScreen from '@/screens/HomeScreen'
import { fontSize, useColors } from '@/theme'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  const { t } = useTranslation()
  const colors = useColors()
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.foreground,
        headerTitleStyle: { fontSize: fontSize.xl, fontWeight: '700' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} options={{ title: t('home.title') }} />
    </Stack.Navigator>
  )
}
