import type { LucideIcon } from 'lucide-react-native'
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native'

import {
  type Colors,
  controlHeight,
  fontSize,
  iconSize,
  radius,
  spacing,
  useColors,
  useThemedStyles,
} from '@/theme'

type Variant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
type Size = 'sm' | 'md' | 'lg' | 'icon' | 'iconSm'

type Props = {
  /** Shown as text, or used as the accessibility label for icon-only sizes. */
  label: string
  icon?: LucideIcon
  onPress: () => void
  variant?: Variant
  size?: Size
  disabled?: boolean
  loading?: boolean
  accessibilityLabel?: string
  style?: StyleProp<ViewStyle>
}

const textColorKey: Record<Variant, keyof Colors> = {
  default: 'primaryForeground',
  secondary: 'foreground',
  outline: 'foreground',
  ghost: 'foreground',
  destructive: 'destructive',
  link: 'primary',
}

export default function Button({
  label,
  icon: Icon,
  onPress,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  accessibilityLabel,
  style,
}: Props) {
  const colors = useColors()
  const styles = useThemedStyles(createStyles)
  const pressedStyles = useThemedStyles(createPressedStyles)
  const inactive = disabled || loading
  const iconOnly = size === 'icon' || size === 'iconSm'
  const color = colors[textColorKey[variant]]
  return (
    <Pressable
      onPress={() => {
        // Leaves the text field being edited, like a tap on empty space.
        Keyboard.dismiss()
        onPress()
      }}
      disabled={inactive}
      accessibilityRole='button'
      accessibilityLabel={accessibilityLabel ?? (iconOnly ? label : undefined)}
      accessibilityState={{ disabled: inactive, busy: loading }}
      hitSlop={iconOnly || variant === 'link' ? 8 : undefined}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        styles[variant],
        pressed && pressedStyles[variant],
        inactive && styles.inactive,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          {Icon ? (
            <Icon
              color={color}
              size={size === 'sm' || size === 'iconSm' ? iconSize.sm : iconSize.md}
            />
          ) : null}
          {iconOnly ? null : (
            <Text style={[styles.label, size === 'sm' && styles.labelSm, { color }]}>{label}</Text>
          )}
        </>
      )}
    </Pressable>
  )
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    sm: {
      height: controlHeight.sm,
      paddingHorizontal: spacing.md,
    },
    md: {
      height: controlHeight.md,
      paddingHorizontal: spacing.lg,
    },
    lg: {
      height: controlHeight.lg,
      paddingHorizontal: spacing.xl,
    },
    icon: {
      width: controlHeight.md,
      height: controlHeight.md,
    },
    iconSm: {
      width: controlHeight.sm,
      height: controlHeight.sm,
    },
    default: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.muted,
    },
    outline: {
      borderColor: colors.input,
    },
    ghost: {},
    destructive: {
      backgroundColor: colors.destructiveMuted,
    },
    link: {
      height: undefined,
      paddingHorizontal: 0,
      paddingVertical: spacing.xs,
      alignSelf: 'flex-start',
    },
    inactive: {
      opacity: 0.5,
    },
    label: {
      fontSize: fontSize.base,
      fontWeight: '600',
    },
    labelSm: {
      fontSize: fontSize.sm,
    },
  })

const createPressedStyles = (colors: Colors) =>
  StyleSheet.create({
    default: { opacity: 0.85 },
    secondary: { backgroundColor: colors.border },
    outline: { backgroundColor: colors.muted },
    ghost: { backgroundColor: colors.muted },
    destructive: { borderColor: colors.destructive },
    link: { opacity: 0.6 },
  })
