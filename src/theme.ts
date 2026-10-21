import { useMemo } from 'react'
import { useColorScheme } from 'react-native'

/**
 * Seule source des valeurs visuelles de l'app (clair + sombre, suit le téléphone).
 * Noms de couleurs façon shadcn/ui ; palette neutre zinc avec un accent vert.
 */
export const lightColors = {
  background: '#FFFFFF',
  card: '#FFFFFF',
  muted: '#F4F4F5',
  border: '#E4E4E7',
  input: '#D4D4D8',
  foreground: '#09090B',
  mutedForeground: '#71717A',
  /** Actions principales et état sélectionné. */
  primary: '#16A34A',
  primaryForeground: '#FFFFFF',
  destructive: '#DC2626',
  /** Fond rouge doux pour que les boutons de suppression ne crient pas à côté du vert. */
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
  /** Vert un peu plus clair : #16A34A est trop sombre pour être lisible sur fond noir. */
  primary: '#22C55E',
  primaryForeground: '#052E16',
  destructive: '#F87171',
  destructiveMuted: '#3B1219',
}

/** Palette qui suit le réglage clair/sombre du téléphone. */
export function useColors(): Colors {
  return useColorScheme() === 'dark' ? darkColors : lightColors
}

/**
 * Construit les styles d'un composant à partir de la palette du moment.
 * Les styles ne sont recalculés que quand le téléphone passe de clair à sombre.
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

/** Hauteurs communes aux boutons et aux champs, pour que les lignes soient alignées. */
export const controlHeight = {
  sm: 36,
  md: 44,
  lg: 52,
}
