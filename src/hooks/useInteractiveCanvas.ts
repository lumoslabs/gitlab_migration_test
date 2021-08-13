import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { InteractiveCanvasContext } from '@contexts/InteractiveCanvasContext'

export default function useInteractiveCanvas() {
  const location = useLocation()
  const {
    outputTts,
    exitContinuousMatchMode,
    sendTextQuery: realSendTextQuery
  } = useContext(InteractiveCanvasContext)

  const sendTextQuery = (query: string, state: Record<any, any> = {}) => {
    state.pathname = location.pathname
    return realSendTextQuery(query, state)
  }

  return {
    outputTts,
    exitContinuousMatchMode,
    sendTextQuery
  }
}
