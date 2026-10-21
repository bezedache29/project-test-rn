import { fireEvent, render } from '@testing-library/react-native'
import { Alert, type AlertButton } from 'react-native'

import type { ScreenProps } from '@/navigation/types'
import TodoListScreen from '@/screens/TodoListScreen'
import { todosAtom } from '@/store/todosAtom'
import { makeJotaiWrapper, makeStore, makeTodo } from '@test-utils/jotai'

const navigate = jest.fn()
const props = {
  navigation: { navigate },
  route: { key: 'TodoList', name: 'TodoList' },
} as unknown as ScreenProps<'TodoList'>

afterEach(() => {
  jest.restoreAllMocks()
  navigate.mockClear()
})

// Simule l'appui sur un bouton de la fenêtre de confirmation (« Supprimer » ou « Annuler »)
function answerAlertWith(style: AlertButton['style']) {
  jest
    .spyOn(Alert, 'alert')
    .mockImplementation((_title, _message, buttons?: AlertButton[]) =>
      buttons?.find((button) => button.style === style)?.onPress?.()
    )
}

describe('TodoListScreen', () => {
  it('shows an empty state when there is no task', async () => {
    const { getByText } = await render(<TodoListScreen {...props} />, {
      wrapper: makeJotaiWrapper(makeStore([])),
    })
    expect(getByText("Aucune tâche pour l'instant")).toBeTruthy()
    await fireEvent.press(getByText('Ajouter une tâche'))
    expect(navigate).toHaveBeenCalledWith('TodoForm')
  })

  it('lists the tasks with the number left to do', async () => {
    const store = makeStore([
      makeTodo({ id: 'a', title: 'Acheter du pain' }),
      makeTodo({ id: 'b', title: 'Sortir le chien', done: true }),
    ])
    const { getByText } = await render(<TodoListScreen {...props} />, {
      wrapper: makeJotaiWrapper(store),
    })
    expect(getByText('Acheter du pain')).toBeTruthy()
    expect(getByText('Sortir le chien')).toBeTruthy()
    expect(getByText('1 tâche restante')).toBeTruthy()
  })

  it('shows tasks to do first, newest first, then finished ones', async () => {
    const store = makeStore([
      makeTodo({ id: 'old', title: 'Ancienne', createdAt: '2026-10-20T00:00:00.000Z' }),
      makeTodo({ id: 'done', title: 'Finie', done: true, createdAt: '2026-10-23T00:00:00.000Z' }),
      makeTodo({ id: 'new', title: 'Récente', createdAt: '2026-10-21T00:00:00.000Z' }),
    ])
    const { getAllByLabelText, getByText } = await render(<TodoListScreen {...props} />, {
      wrapper: makeJotaiWrapper(store),
    })
    // L'ordre des cases à cocher donne l'ordre d'affichage des lignes
    const labels = getAllByLabelText(/^Marquer/).map((box) => box.props.accessibilityLabel)
    expect(labels).toEqual([
      'Marquer « Récente » comme terminée',
      'Marquer « Ancienne » comme terminée',
      'Marquer « Finie » comme terminée',
    ])
    expect(getByText('2 tâches restantes')).toBeTruthy()
  })

  it('marks a task as done when its box is ticked', async () => {
    const store = makeStore([makeTodo({ id: 'a', title: 'Acheter du pain' })])
    const { getByLabelText, getByText } = await render(<TodoListScreen {...props} />, {
      wrapper: makeJotaiWrapper(store),
    })
    await fireEvent.press(getByLabelText('Marquer « Acheter du pain » comme terminée'))
    expect(store.get(todosAtom)[0].done).toBe(true)
    expect(getByText('Tout est fait, bravo !')).toBeTruthy()
  })

  it('opens the edit screen when a task is pressed', async () => {
    const store = makeStore([makeTodo({ id: 'a', title: 'Acheter du pain' })])
    const { getByText } = await render(<TodoListScreen {...props} />, {
      wrapper: makeJotaiWrapper(store),
    })
    await fireEvent.press(getByText('Acheter du pain'))
    expect(navigate).toHaveBeenCalledWith('TodoForm', { id: 'a' })
  })

  it('deletes a task after confirmation', async () => {
    answerAlertWith('destructive')
    const store = makeStore([makeTodo({ id: 'a', title: 'Acheter du pain' })])
    const { getByLabelText, getByText } = await render(<TodoListScreen {...props} />, {
      wrapper: makeJotaiWrapper(store),
    })
    await fireEvent.press(getByLabelText('Supprimer « Acheter du pain »'))
    expect(Alert.alert).toHaveBeenCalledWith(
      'Supprimer cette tâche ?',
      '« Acheter du pain » sera définitivement supprimée.',
      expect.any(Array)
    )
    expect(store.get(todosAtom)).toHaveLength(0)
    expect(getByText("Aucune tâche pour l'instant")).toBeTruthy()
  })

  it('keeps the task when the deletion is cancelled', async () => {
    answerAlertWith('cancel')
    const store = makeStore([makeTodo({ id: 'a', title: 'Acheter du pain' })])
    const { getByLabelText } = await render(<TodoListScreen {...props} />, {
      wrapper: makeJotaiWrapper(store),
    })
    await fireEvent.press(getByLabelText('Supprimer « Acheter du pain »'))
    expect(store.get(todosAtom)).toHaveLength(1)
  })
})
