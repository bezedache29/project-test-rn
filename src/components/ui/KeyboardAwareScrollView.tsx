import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewInstance,
  ScrollViewProps,
  TextInput,
  View,
} from 'react-native'

import { spacing } from '@/theme'

/** Espace gardé entre le champ actif et le haut du clavier. */
const MARGIN = spacing.xl

const RevealContext = createContext<(() => void) | null>(null)

/** Permet à un champ de demander à la zone de défilement de le remonter au-dessus du clavier. */
export const useRevealOnFocus = () => useContext(RevealContext)

/**
 * ScrollView qui garde le champ actif visible au-dessus du clavier.
 * Android dessine l'app derrière le clavier (edge-to-edge), donc l'écran ne
 * rétrécit pas tout seul : on ajoute de la place en bas et on remonte le champ.
 */
export default function KeyboardAwareScrollView({ children, onScroll, ...props }: ScrollViewProps) {
  const scrollRef = useRef<ScrollViewInstance>(null)
  const scrollY = useRef(0)
  const keyboardTop = useRef<number | null>(null)
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  const reveal = useCallback(() => {
    const top = keyboardTop.current
    const input = TextInput.State.currentlyFocusedInput()
    if (top == null || !input) {
      return
    }
    input.measureInWindow((_x, y, _width, height) => {
      const overlap = y + height + MARGIN - top
      if (overlap > 0) {
        scrollRef.current?.scrollTo({
          y: scrollY.current + overlap,
          animated: true,
        })
      }
    })
  }, [])

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (event) => {
      keyboardTop.current = event.endCoordinates.screenY
      setKeyboardHeight(event.endCoordinates.height)
      // Attend que l'espace ajouté en bas soit en place avant de défiler.
      requestAnimationFrame(reveal)
    })
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      keyboardTop.current = null
      setKeyboardHeight(0)
    })
    return () => {
      show.remove()
      hide.remove()
    }
  }, [reveal])

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.current = event.nativeEvent.contentOffset.y
      onScroll?.(event)
    },
    [onScroll]
  )

  // Un champ activé alors que le clavier est déjà ouvert ne reçoit pas d'événement
  // clavier : il appelle cette fonction lui-même (voir Input).
  const revealSoon = useMemo(() => () => setTimeout(reveal, 50), [reveal])

  return (
    <RevealContext.Provider value={revealSoon}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps='handled'
        {...props}
      >
        {children}
        <View style={{ height: keyboardHeight }} />
      </ScrollView>
    </RevealContext.Provider>
  )
}
