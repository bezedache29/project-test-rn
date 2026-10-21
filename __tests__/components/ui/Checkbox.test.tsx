import { fireEvent, render } from '@testing-library/react-native'

import Checkbox from '@/components/ui/Checkbox'

describe('Checkbox', () => {
  it('exposes its checked state to screen readers', async () => {
    const { getByLabelText } = await render(
      <Checkbox checked accessibilityLabel='Terminée' onChange={jest.fn()} />
    )
    expect(getByLabelText('Terminée')).toBeChecked()
  })

  it('calls onChange when pressed', async () => {
    const onChange = jest.fn()
    const { getByLabelText } = await render(
      <Checkbox checked={false} accessibilityLabel='Terminée' onChange={onChange} />
    )
    await fireEvent.press(getByLabelText('Terminée'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
