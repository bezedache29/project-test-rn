import { fireEvent, render } from '@testing-library/react-native'

import Button from '@/components/ui/Button'

describe('Button', () => {
  it('renders its label', async () => {
    const { getByText } = await render(<Button label='Enregistrer' onPress={jest.fn()} />)
    expect(getByText('Enregistrer')).toBeTruthy()
  })

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn()
    const { getByText } = await render(<Button label='Enregistrer' onPress={onPress} />)
    await fireEvent.press(getByText('Enregistrer'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn()
    const { getByText } = await render(<Button label='Enregistrer' onPress={onPress} disabled />)
    await fireEvent.press(getByText('Enregistrer'))
    expect(onPress).not.toHaveBeenCalled()
  })
})
