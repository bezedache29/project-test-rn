import { isAxiosError } from 'axios'

import i18n from '@/i18n'

/** Readable French message for any error thrown by an API call. */
export function getApiErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) return i18n.t('errors.unknown')
  if (!error.response) return i18n.t('errors.network')
  const { status } = error.response
  if (status === 401) return i18n.t('errors.unauthorized')
  if (status >= 500) return i18n.t('errors.server')
  return i18n.t('errors.unknown')
}

/** Field errors of a Laravel 422 response (already camelCase), ready for setError. */
export function getValidationErrors(error: unknown): Record<string, string[]> | null {
  if (!isAxiosError(error) || error.response?.status !== 422) return null
  const errors = (error.response.data as { errors?: Record<string, string[]> } | undefined)?.errors
  return errors ?? null
}
