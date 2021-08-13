import { useContext } from 'react'
import { InteractiveCanvasContext } from '@contexts/InteractiveCanvasContext'

export default function useInteractiveCanvas() {
  const interactiveCanvas = useContext(InteractiveCanvasContext)
  return interactiveCanvas
}
