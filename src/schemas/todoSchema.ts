import { z } from 'zod'

import i18n from '@/i18n'

export const TODO_TITLE_MAX = 100

export const todoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: () => i18n.t('todoForm.titleRequired') })
    .max(TODO_TITLE_MAX, { error: () => i18n.t('todoForm.titleTooLong', { max: TODO_TITLE_MAX }) }),
})

export type TodoFormValues = z.infer<typeof todoSchema>
