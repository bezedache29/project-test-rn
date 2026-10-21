import { Check } from 'lucide-react-native'
import { Pressable, StyleSheet } from 'react-native'

import { type Colors, iconSize, radius, useColors, useThemedStyles } from '@/theme'

type Props = {
  checked: boolean
  onChange: () => void
  /** Lu par le lecteur d'écran : dit à quoi sert la case. */
  accessibilityLabel: string
}

const SIZE = 24

export default function Checkbox({ checked, onChange, accessibilityLabel }: Props) {
  const colors = useColors()
  const styles = useThemedStyles(createStyles)
  return (
    <Pressable
      onPress={onChange}
      accessibilityRole='checkbox'
      accessibilityState={{ checked }}
      accessibilityLabel={accessibilityLabel}
      hitSlop={10}
      style={({ pressed }) => [styles.box, checked && styles.checked, pressed && styles.pressed]}
    >
      {checked ? (
        <Check color={colors.primaryForeground} size={iconSize.sm} strokeWidth={3} />
      ) : null}
    </Pressable>
  )
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    box: {
      width: SIZE,
      height: SIZE,
      borderRadius: radius.sm,
      borderWidth: 2,
      borderColor: colors.input,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checked: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    pressed: {
      opacity: 0.7,
    },
  })
