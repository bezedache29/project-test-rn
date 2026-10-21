import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

import FormInput from '@/components/FormInput'
import Button from '@/components/ui/Button'
import KeyboardAwareScrollView from '@/components/ui/KeyboardAwareScrollView'
import type { ScreenProps } from '@/navigation/types'
import { TODO_TITLE_MAX, type TodoFormValues, todoSchema } from '@/schemas/todoSchema'
import { todosAtom } from '@/store/todosAtom'
import { spacing } from '@/theme'
import { addTodo, updateTodoTitle } from '@/utils/todos'

/** Crée une tâche, ou la modifie quand un id est passé. */
export default function TodoFormScreen({ navigation, route }: ScreenProps<'TodoForm'>) {
  const { t } = useTranslation()
  const [todos, setTodos] = useAtom(todosAtom)
  const id = route.params?.id
  const existing = id ? todos.find((todo) => todo.id === id) : undefined

  const { control, handleSubmit, formState } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: { title: existing?.title ?? '' },
  })

  const onSubmit = ({ title }: TodoFormValues) => {
    setTodos((prev) =>
      existing ? updateTodoTitle(prev, existing.id, title) : addTodo(prev, title)
    )
    navigation.goBack()
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.content}>
      <FormInput
        control={control}
        name='title'
        label={t('todoForm.titleLabel')}
        placeholder={t('todoForm.titlePlaceholder')}
        maxLength={TODO_TITLE_MAX}
        autoFocus
        returnKeyType='done'
        onSubmitEditing={() => handleSubmit(onSubmit)()}
      />
      <Button
        label={t('common.save')}
        onPress={handleSubmit(onSubmit)}
        loading={formState.isSubmitting}
      />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
})
