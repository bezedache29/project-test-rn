import type { ReactNode } from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { type Colors, radius, spacing, useThemedStyles } from '@/theme'

type Props = {
  children: ReactNode
  /** Makes the whole card tappable. */
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

export default function Card({ children, onPress, style }: Props) {
  const styles = useThemedStyles(createStyles)
  if (!onPress) {
    return <View style={[styles.card, style]}>{children}</View>
  }
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
    >
      {children}
    </Pressable>
  )
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.lg,
      padding: spacing.md,
    },
    pressed: {
      backgroundColor: colors.muted,
    },
  })
