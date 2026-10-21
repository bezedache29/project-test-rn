import { fireEvent, render, waitFor } from '@testing-library/react-native'

import type { ScreenProps } from '@/navigation/types'
import TodoFormScreen from '@/screens/TodoFormScreen'
import { todosAtom } from '@/store/todosAtom'
import { makeJotaiWrapper, makeStore, makeTodo } from '@test-utils/jotai'

const goBack = jest.fn()

function makeProps(id?: string) {
  return {
    navigation: { goBack },
    route: { key: 'TodoForm', name: 'TodoForm', params: id ? { id } : undefined },
  } as unknown as ScreenProps<'TodoForm'>
}

afterEach(() => jest.clearAllMocks())

describe('TodoFormScreen', () => {
  it('creates a task and goes back', async () => {
    const store = makeStore([])
    const { getByLabelText, getByText } = await render(<TodoFormScreen {...makeProps()} />, {
      wrapper: makeJotaiWrapper(store),
    })
    await fireEvent.changeText(getByLabelText('Titre'), '  Lire un livre  ')
    await fireEvent.press(getByText('Enregistrer'))
    await waitFor(() => expect(goBack).toHaveBeenCalledTimes(1))
    // Les espaces autour du titre sont retirés par le schéma
    expect(store.get(todosAtom)).toEqual([
      expect.objectContaining({ title: 'Lire un livre', done: false }),
    ])
  })

  it('refuses an empty title', async () => {
    const store = makeStore([])
    const { getByLabelText, getByText, findByText } = await render(
      <TodoFormScreen {...makeProps()} />,
      { wrapper: makeJotaiWrapper(store) }
    )
    await fireEvent.changeText(getByLabelText('Titre'), '   ')
    await fireEvent.press(getByText('Enregistrer'))
    expect(await findByText('Écris un titre pour ta tâche.')).toBeTruthy()
    expect(store.get(todosAtom)).toHaveLength(0)
    expect(goBack).not.toHaveBeenCalled()
  })

  it('edits an existing task and keeps its done state', async () => {
    const store = makeStore([makeTodo({ id: 'a', title: 'Acheter du pain', done: true })])
    const { getByLabelText, getByText } = await render(<TodoFormScreen {...makeProps('a')} />, {
      wrapper: makeJotaiWrapper(store),
    })
    const input = getByLabelText('Titre')
    expect(input.props.value).toBe('Acheter du pain')
    await fireEvent.changeText(input, 'Acheter des croissants')
    await fireEvent.press(getByText('Enregistrer'))
    await waitFor(() => expect(goBack).toHaveBeenCalledTimes(1))
    expect(store.get(todosAtom)).toEqual([
      expect.objectContaining({ id: 'a', title: 'Acheter des croissants', done: true }),
    ])
  })

  it('creates a new task when the id to edit no longer exists', async () => {
    // Cas d'une tâche supprimée entre-temps : le formulaire part vide et crée une nouvelle tâche
    const store = makeStore([makeTodo({ id: 'a', title: 'Acheter du pain' })])
    const { getByLabelText, getByText } = await render(
      <TodoFormScreen {...makeProps('unknown')} />,
      { wrapper: makeJotaiWrapper(store) }
    )
    const input = getByLabelText('Titre')
    expect(input.props.value).toBe('')
    await fireEvent.changeText(input, 'Sortir le chien')
    await fireEvent.press(getByText('Enregistrer'))
    await waitFor(() => expect(goBack).toHaveBeenCalledTimes(1))
    expect(store.get(todosAtom).map((todo) => todo.title)).toEqual([
      'Acheter du pain',
      'Sortir le chien',
    ])
  })

  it('refuses a title longer than 100 characters', async () => {
    const store = makeStore([])
    const { getByLabelText, getByText, findByText } = await render(
      <TodoFormScreen {...makeProps()} />,
      { wrapper: makeJotaiWrapper(store) }
    )
    // maxLength bloque la saisie au clavier, mais un collage ou un test peut le contourner
    await fireEvent.changeText(getByLabelText('Titre'), 'a'.repeat(101))
    await fireEvent.press(getByText('Enregistrer'))
    expect(await findByText('100 caractères maximum.')).toBeTruthy()
    expect(store.get(todosAtom)).toHaveLength(0)
    expect(goBack).not.toHaveBeenCalled()
  })
})
