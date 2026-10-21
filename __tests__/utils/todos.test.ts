import {
  addTodo,
  countRemaining,
  removeTodo,
  sortTodos,
  toggleTodo,
  updateTodoTitle,
} from '@/utils/todos'
import { makeTodo } from '@test-utils/jotai'

describe('todos utils', () => {
  it('adds a task that is not done yet', () => {
    const now = new Date('2026-10-22T10:00:00.000Z')
    const result = addTodo([], 'Lire un livre', now)
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({
      title: 'Lire un livre',
      done: false,
      createdAt: '2026-10-22T10:00:00.000Z',
    })
    expect(result[0].id).toEqual(expect.any(String))
  })

  it('gives each new task a different id', () => {
    const list = addTodo(addTodo([], 'A'), 'B')
    expect(list[0].id).not.toBe(list[1].id)
  })

  it('updates only the title of the matching task', () => {
    const list = [makeTodo({ id: 'a' }), makeTodo({ id: 'b', title: 'Autre' })]
    const result = updateTodoTitle(list, 'a', 'Nouveau titre')
    expect(result[0].title).toBe('Nouveau titre')
    expect(result[1].title).toBe('Autre')
  })

  it('toggles the done state back and forth', () => {
    const list = [makeTodo({ id: 'a' })]
    const once = toggleTodo(list, 'a')
    expect(once[0].done).toBe(true)
    expect(toggleTodo(once, 'a')[0].done).toBe(false)
  })

  it('removes the matching task', () => {
    const list = [makeTodo({ id: 'a' }), makeTodo({ id: 'b' })]
    expect(removeTodo(list, 'a').map((todo) => todo.id)).toEqual(['b'])
  })

  it('sorts tasks to do first, newest first', () => {
    const list = [
      makeTodo({ id: 'old', createdAt: '2026-10-20T00:00:00.000Z' }),
      makeTodo({ id: 'done', done: true, createdAt: '2026-10-23T00:00:00.000Z' }),
      makeTodo({ id: 'new', createdAt: '2026-10-21T00:00:00.000Z' }),
    ]
    expect(sortTodos(list).map((todo) => todo.id)).toEqual(['new', 'old', 'done'])
  })

  it('does not change the original list when sorting', () => {
    const list = [makeTodo({ id: 'a', done: true }), makeTodo({ id: 'b' })]
    sortTodos(list)
    expect(list.map((todo) => todo.id)).toEqual(['a', 'b'])
  })

  it('counts the tasks left to do', () => {
    const list = [makeTodo({ id: 'a' }), makeTodo({ id: 'b', done: true }), makeTodo({ id: 'c' })]
    expect(countRemaining(list)).toBe(2)
  })
})
