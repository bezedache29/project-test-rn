import { Plus } from 'lucide-react-native'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text } from 'react-native'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import type { ScreenProps } from '@/navigation/types'
import { type Colors, fontSize, spacing, useThemedStyles } from '@/theme'

export default function HomeScreen(_props: ScreenProps<'Home'>) {
  const { t } = useTranslation()
  const styles = useThemedStyles(createStyles)
  const [count, setCount] = useState(0)
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Card style={styles.card}>
        <Text style={styles.title}>{t('home.welcomeTitle')}</Text>
        <Text style={styles.text}>{t('home.welcomeText')}</Text>
      </Card>
      <Button
        label={t('home.counterLabel', { count })}
        icon={Plus}
        onPress={() => setCount((value) => value + 1)}
      />
    </ScrollView>
  )
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    content: {
      padding: spacing.lg,
      gap: spacing.lg,
    },
    card: {
      gap: spacing.sm,
    },
    title: {
      color: colors.foreground,
      fontSize: fontSize.xl,
      fontWeight: '700',
    },
    text: {
      color: colors.mutedForeground,
      fontSize: fontSize.base,
    },
  })
