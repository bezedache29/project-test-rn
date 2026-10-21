import type { Todo } from '@/models/todo/todo.model'

/** Assez unique pour une liste locale ; pas besoin de lib. */
function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function addTodo(todos: Todo[], title: string, now = new Date()): Todo[] {
  const todo: Todo = { id: makeId(), title, done: false, createdAt: now.toISOString() }
  return [...todos, todo]
}

export function updateTodoTitle(todos: Todo[], id: string, title: string): Todo[] {
  return todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
}

export function removeTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((todo) => todo.id !== id)
}

/** Les tâches à faire d'abord, puis les terminées ; les plus récentes en premier dans chaque groupe. */
export function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1
    return b.createdAt.localeCompare(a.createdAt)
  })
}

export function countRemaining(todos: Todo[]): number {
  return todos.filter((todo) => !todo.done).length
}
