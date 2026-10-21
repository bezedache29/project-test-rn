import { createStore, Provider } from 'jotai'
import type { ReactNode } from 'react'

import type { Todo } from '@/models/todo/todo.model'
import { todosAtom } from '@/store/todosAtom'

/** Un store neuf par test ; écrase aussi la valeur du (faux) MMKV laissée par un test précédent. */
export function makeStore(todos: Todo[] = []) {
  const store = createStore()
  store.set(todosAtom, todos)
  return store
}

export function makeJotaiWrapper(store = makeStore()) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
}

export function makeTodo(overrides: Partial<Todo> = {}): Todo {
  return {
    id: 'todo-1',
    title: 'Acheter du pain',
    done: false,
    createdAt: '2026-10-22T08:00:00.000Z',
    ...overrides,
  }
}
