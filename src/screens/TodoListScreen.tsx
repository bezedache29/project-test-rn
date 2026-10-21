import { useAtom } from 'jotai'
import { Plus } from 'lucide-react-native'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'

import TodoItem from '@/components/TodoItem'
import Button from '@/components/ui/Button'
import type { Todo } from '@/models/todo/todo.model'
import type { ScreenProps } from '@/navigation/types'
import { todosAtom } from '@/store/todosAtom'
import { type Colors, fontSize, spacing, useThemedStyles } from '@/theme'
import { countRemaining, removeTodo, sortTodos, toggleTodo } from '@/utils/todos'

export default function TodoListScreen({ navigation }: ScreenProps<'TodoList'>) {
  const { t } = useTranslation()
  const styles = useThemedStyles(createStyles)
  const [todos, setTodos] = useAtom(todosAtom)

  const sortedTodos = sortTodos(todos)
  const remaining = countRemaining(todos)

  // Callbacks stables : TodoItem est mémoïsé, il ne se redessine que si sa tâche change
  const handleToggle = useCallback(
    (id: string) => setTodos((prev) => toggleTodo(prev, id)),
    [setTodos]
  )

  const handleEdit = useCallback(
    (id: string) => navigation.navigate('TodoForm', { id }),
    [navigation]
  )

  const handleDelete = useCallback(
    (todo: Todo) => {
      Alert.alert(
        t('todoList.deleteConfirmTitle'),
        t('todoList.deleteConfirmText', { title: todo.title }),
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('common.delete'),
            style: 'destructive',
            onPress: () => setTodos((prev) => removeTodo(prev, todo.id)),
          },
        ]
      )
    },
    [setTodos, t]
  )

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => (
      <TodoItem todo={item} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
    ),
    [handleToggle, handleEdit, handleDelete]
  )

  if (todos.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>{t('todoList.emptyTitle')}</Text>
        <Text style={styles.emptyText}>{t('todoList.emptyText')}</Text>
        <Button
          label={t('todoList.add')}
          icon={Plus}
          onPress={() => navigation.navigate('TodoForm')}
        />
      </View>
    )
  }

  return (
    <FlatList
      data={sortedTodos}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={
        <Text style={styles.counter}>
          {remaining === 0 ? t('todoList.allDone') : t('todoList.remaining', { count: remaining })}
        </Text>
      }
    />
  )
}

const keyExtractor = (todo: Todo) => todo.id

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    list: {
      padding: spacing.lg,
      gap: spacing.sm,
    },
    counter: {
      color: colors.mutedForeground,
      fontSize: fontSize.sm,
      marginBottom: spacing.xs,
    },
    empty: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.xl,
      gap: spacing.md,
    },
    emptyTitle: {
      color: colors.foreground,
      fontSize: fontSize.lg,
      fontWeight: '700',
      textAlign: 'center',
    },
    emptyText: {
      color: colors.mutedForeground,
      fontSize: fontSize.base,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
  })
