import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Plus } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

import Button from '@/components/ui/Button'
import type { RootStackParamList } from '@/navigation/types'
import TodoFormScreen from '@/screens/TodoFormScreen'
import TodoListScreen from '@/screens/TodoListScreen'
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
      <Stack.Screen
        name='TodoList'
        component={TodoListScreen}
        options={({ navigation }) => ({
          title: t('todoList.title'),
          headerRight: () => (
            <Button
              label={t('todoList.add')}
              icon={Plus}
              variant='ghost'
              size='icon'
              onPress={() => navigation.navigate('TodoForm')}
            />
          ),
        })}
      />
      <Stack.Screen
        name='TodoForm'
        component={TodoFormScreen}
        options={({ route }) => ({
          title: route.params?.id ? t('todoForm.editTitle') : t('todoForm.createTitle'),
        })}
      />
    </Stack.Navigator>
  )
}
