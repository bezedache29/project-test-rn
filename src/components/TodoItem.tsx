import { Trash2 } from 'lucide-react-native'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text } from 'react-native'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Checkbox from '@/components/ui/Checkbox'
import type { Todo } from '@/models/todo/todo.model'
import { type Colors, fontSize, spacing, useThemedStyles } from '@/theme'

type Props = {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (todo: Todo) => void
}

/** Une ligne de la liste ; mémoïsée pour que cocher une tâche ne redessine que cette ligne. */
function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const { t } = useTranslation()
  const styles = useThemedStyles(createStyles)
  return (
    <Card style={styles.row}>
      <Checkbox
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        accessibilityLabel={t('todoList.toggleLabel', { title: todo.title })}
      />
      <Pressable
        onPress={() => onEdit(todo.id)}
        accessibilityRole='button'
        style={styles.titleArea}
      >
        <Text style={[styles.title, todo.done && styles.titleDone]} numberOfLines={2}>
          {todo.title}
        </Text>
      </Pressable>
      <Button
        label={t('todoList.deleteLabel', { title: todo.title })}
        icon={Trash2}
        variant='ghost'
        size='iconSm'
        onPress={() => onDelete(todo)}
      />
    </Card>
  )
}

export default memo(TodoItem)

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingVertical: spacing.sm,
    },
    titleArea: {
      flex: 1,
      paddingVertical: spacing.sm,
    },
    title: {
      color: colors.foreground,
      fontSize: fontSize.base,
    },
    titleDone: {
      color: colors.mutedForeground,
      textDecorationLine: 'line-through',
    },
  })
