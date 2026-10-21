import type { Todo } from '@/models/todo/todo.model'
import { atomWithMMKV } from '@/store/atomWithMMKV'

// Persisté : les tâches restent après la fermeture de l'app
export const todosAtom = atomWithMMKV<Todo[]>('todos', [])
