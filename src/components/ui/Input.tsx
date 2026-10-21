import { useState } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

import { useRevealOnFocus } from '@/components/ui/KeyboardAwareScrollView'
import {
  type Colors,
  controlHeight,
  fontSize,
  radius,
  spacing,
  useColors,
  useThemedStyles,
} from '@/theme'

type Props = TextInputProps & {
  label?: string
  /** Shown under the field; also turns its border red. */
  error?: string
}

/** Text field with the app's look; the border lights up while typing. */
export default function Input({
  label,
  error,
  style,
  multiline,
  onFocus,
  onBlur,
  onContentSizeChange,
  ...props
}: Props) {
  const colors = useColors()
  const styles = useThemedStyles(createStyles)
  const [focused, setFocused] = useState(false)
  const reveal = useRevealOnFocus()
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.mutedForeground}
        selectionColor={colors.primary}
        cursorColor={colors.primary}
        multiline={multiline}
        accessibilityLabel={label}
        onFocus={(e) => {
          setFocused(true)
          reveal?.()
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e)
        }}
        onContentSizeChange={(e) => {
          // A growing multi-line field must stay above the keyboard.
          if (focused && multiline) {
            reveal?.()
          }
          onContentSizeChange?.(e)
        }}
        style={[
          styles.input,
          multiline && styles.multiline,
          focused && styles.focused,
          error ? styles.invalid : null,
          style,
        ]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      gap: spacing.xs,
    },
    label: {
      color: colors.foreground,
      fontSize: fontSize.sm,
      fontWeight: '600',
    },
    input: {
      minHeight: controlHeight.md,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.input,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      color: colors.foreground,
      fontSize: fontSize.base,
    },
    multiline: {
      minHeight: 88,
      paddingTop: spacing.md,
      textAlignVertical: 'top',
    },
    focused: {
      borderColor: colors.primary,
    },
    invalid: {
      borderColor: colors.destructive,
    },
    error: {
      color: colors.destructive,
      fontSize: fontSize.sm,
    },
  })
