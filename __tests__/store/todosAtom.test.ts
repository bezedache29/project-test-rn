import { createStore } from 'jotai'
import { createMMKV } from 'react-native-mmkv'

import type { Todo } from '@/models/todo/todo.model'
import { todosAtom } from '@/store/todosAtom'
import { makeTodo } from '@test-utils/jotai'

// Le faux MMKV (__mocks__/react-native-mmkv.ts) garde les valeurs en mémoire
const mmkv = createMMKV()

// Simule un redémarrage de l'app : modules rechargés, avec `saved` déjà présent dans MMKV.
// L'atome lit MMKV une seule fois, au chargement du module (getOnInit), d'où ce rechargement.
function readTodosAfterRestart(saved: string | undefined): Todo[] {
  let todos: Todo[] = []
  jest.isolateModules(() => {
    const freshMmkv = (
      require('react-native-mmkv') as typeof import('react-native-mmkv')
    ).createMMKV()
    if (saved !== undefined) freshMmkv.set('todos', saved)
    const fresh = require('@/store/todosAtom') as typeof import('@/store/todosAtom')
    todos = createStore().get(fresh.todosAtom)
  })
  return todos
}

describe('todosAtom', () => {
  it('saves the tasks in MMKV as JSON under the "todos" key', () => {
    const store = createStore()
    const todos = [makeTodo({ id: 'a', title: 'Acheter du pain' })]
    store.set(todosAtom, todos)
    expect(JSON.parse(mmkv.getString('todos') ?? 'null')).toEqual(todos)
  })

  it('loads the saved tasks when the app starts again', () => {
    const todos = [makeTodo({ id: 'a' }), makeTodo({ id: 'b', done: true })]
    expect(readTodosAfterRestart(JSON.stringify(todos))).toEqual(todos)
  })

  it('starts with an empty list when nothing is saved', () => {
    expect(readTodosAfterRestart(undefined)).toEqual([])
  })

  it('falls back to an empty list when the saved value is not valid JSON', () => {
    // Donnée abîmée : l'app ne doit pas planter au démarrage
    expect(readTodosAfterRestart('{pas du json')).toEqual([])
  })
})
