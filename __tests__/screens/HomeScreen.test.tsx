import { fireEvent, render } from '@testing-library/react-native'

import type { ScreenProps } from '@/navigation/types'
import HomeScreen from '@/screens/HomeScreen'

// L'écran n'utilise pas la navigation : des props vides suffisent
const props = {} as ScreenProps<'Home'>

describe('HomeScreen', () => {
  it('shows the welcome message', async () => {
    const { getByText } = await render(<HomeScreen {...props} />)
    expect(getByText('Bienvenue')).toBeTruthy()
  })

  it('increments the counter when the button is pressed', async () => {
    const { getByText } = await render(<HomeScreen {...props} />)
    await fireEvent.press(getByText('Appuyé 0 fois'))
    expect(getByText('Appuyé 1 fois')).toBeTruthy()
  })
})
