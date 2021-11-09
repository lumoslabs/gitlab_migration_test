import { Intents, InteractiveCanvasContext } from '@contexts/InteractiveCanvasContext'
import { useContext, useEffect } from 'react'
import { MatchedIntent } from 'src/global'
import useAmplitude from './useAmplitude'

export default function useExpect(intentId: Intents, callback: (matchedIntent: MatchedIntent) => void) {
  const track = useAmplitude()
  const { expect } = useContext(InteractiveCanvasContext)

  useEffect(() => {
    const intentHandler = expect(intentId, (matchedIntent) => {
      track(`intent_${intentId}`)
      callback(matchedIntent)
    })
    return () => {
      intentHandler?.deleteHandler()
    }
  }, [])

  return {}
}
