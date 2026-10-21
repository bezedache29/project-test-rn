import { isAxiosError } from 'axios'

import i18n from '@/i18n'

/** Message lisible en français pour toute erreur levée par un appel API. */
export function getApiErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) return i18n.t('errors.unknown')
  if (!error.response) return i18n.t('errors.network')
  const { status } = error.response
  if (status === 401) return i18n.t('errors.unauthorized')
  if (status >= 500) return i18n.t('errors.server')
  return i18n.t('errors.unknown')
}

/** Erreurs par champ d'une réponse 422 de Laravel (déjà en camelCase), prêtes pour setError. */
export function getValidationErrors(error: unknown): Record<string, string[]> | null {
  if (!isAxiosError(error) || error.response?.status !== 422) return null
  const errors = (error.response.data as { errors?: Record<string, string[]> } | undefined)?.errors
  return errors ?? null
}
