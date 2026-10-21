import { TODO_TITLE_MAX, todoSchema } from '@/schemas/todoSchema'

// Renvoie le premier message d'erreur du schéma, ou undefined si le titre est accepté
function firstError(title: string) {
  const result = todoSchema.safeParse({ title })
  return result.success ? undefined : result.error.issues[0].message
}

describe('todoSchema', () => {
  it('accepts a title and trims the spaces around it', () => {
    expect(todoSchema.parse({ title: '  Lire un livre  ' })).toEqual({ title: 'Lire un livre' })
  })

  it('refuses an empty or blank title with a French message', () => {
    expect(firstError('')).toBe('Écris un titre pour ta tâche.')
    expect(firstError('    ')).toBe('Écris un titre pour ta tâche.')
  })

  it('accepts a title of exactly the maximum length', () => {
    expect(firstError('a'.repeat(TODO_TITLE_MAX))).toBeUndefined()
  })

  it('refuses a title longer than the maximum', () => {
    expect(firstError('a'.repeat(TODO_TITLE_MAX + 1))).toBe('100 caractères maximum.')
  })

  it('counts the length after trimming the spaces', () => {
    // 100 lettres entourées d'espaces : valide une fois les espaces retirés
    expect(firstError(`  ${'a'.repeat(TODO_TITLE_MAX)}  `)).toBeUndefined()
  })
})
