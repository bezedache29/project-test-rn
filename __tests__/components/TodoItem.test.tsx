import { fireEvent, render } from '@testing-library/react-native'

import TodoItem from '@/components/TodoItem'
import { makeTodo } from '@test-utils/jotai'

function renderItem(done: boolean) {
  const handlers = { onToggle: jest.fn(), onEdit: jest.fn(), onDelete: jest.fn() }
  const todo = makeTodo({ id: 'a', title: 'Acheter du pain', done })
  return { todo, handlers, view: render(<TodoItem todo={todo} {...handlers} />) }
}

describe('TodoItem', () => {
  it('shows the title with an unticked box for a task to do', async () => {
    const { view } = renderItem(false)
    const { getByText, getByLabelText } = await view
    expect(getByText('Acheter du pain')).toBeTruthy()
    expect(getByLabelText('Marquer « Acheter du pain » comme terminée')).not.toBeChecked()
  })

  it('shows a ticked box for a finished task', async () => {
    const { view } = renderItem(true)
    const { getByLabelText } = await view
    expect(getByLabelText('Marquer « Acheter du pain » comme terminée')).toBeChecked()
  })

  it('sends the task id when ticked or pressed, and the whole task when deleted', async () => {
    const { todo, handlers, view } = renderItem(false)
    const { getByText, getByLabelText } = await view
    await fireEvent.press(getByLabelText('Marquer « Acheter du pain » comme terminée'))
    expect(handlers.onToggle).toHaveBeenCalledWith('a')
    await fireEvent.press(getByText('Acheter du pain'))
    expect(handlers.onEdit).toHaveBeenCalledWith('a')
    // La suppression reçoit la tâche entière : l'écran en a besoin pour le texte de confirmation
    await fireEvent.press(getByLabelText('Supprimer « Acheter du pain »'))
    expect(handlers.onDelete).toHaveBeenCalledWith(todo)
  })
})
