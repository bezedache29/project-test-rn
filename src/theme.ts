import { useMemo } from 'react'
import { useColorScheme } from 'react-native'

/**
 * Single source of every visual value in the app (light + dark, follows the phone).
 * Token names follow shadcn/ui; neutral zinc palette with a green accent.
 */
export const lightColors = {
  background: '#FFFFFF',
  card: '#FFFFFF',
  muted: '#F4F4F5',
  border: '#E4E4E7',
  input: '#D4D4D8',
  foreground: '#09090B',
  mutedForeground: '#71717A',
  /** Main actions and selected state. */
  primary: '#16A34A',
  primaryForeground: '#FFFFFF',
  destructive: '#DC2626',
  /** Soft red background so delete buttons don't shout next to the green. */
  destructiveMuted: '#FEE2E2',
}

export type Colors = typeof lightColors

export const darkColors: Colors = {
  background: '#09090B',
  card: '#18181B',
  muted: '#27272A',
  border: '#27272A',
  input: '#3F3F46',
  foreground: '#FAFAFA',
  mutedForeground: '#A1A1AA',
  /** Slightly lighter green: #16A34A is too dark to read on a black background. */
  primary: '#22C55E',
  primaryForeground: '#052E16',
  destructive: '#F87171',
  destructiveMuted: '#3B1219',
}

/** Palette matching the phone's light/dark setting. */
export function useColors(): Colors {
  return useColorScheme() === 'dark' ? darkColors : lightColors
}

/**
 * Builds a component's styles from the current palette.
 * Styles are only rebuilt when the phone switches between light and dark.
 */
export function useThemedStyles<T>(createStyles: (colors: Colors) => T): T {
  const colors = useColors()
  return useMemo(() => createStyles(colors), [createStyles, colors])
}

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  full: 999,
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
}

export const fontSize = {
  xs: 12,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  xxl: 26,
}

export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
}

/** Heights shared by buttons and inputs so rows line up. */
export const controlHeight = {
  sm: 36,
  md: 44,
  lg: 52,
}
