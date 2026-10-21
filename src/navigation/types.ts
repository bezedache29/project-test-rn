import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  TodoList: undefined
  /** Sans id : crée une tâche. Avec un id : modifie cette tâche. */
  TodoForm: { id?: string } | undefined
}

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>
