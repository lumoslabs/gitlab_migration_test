import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { InteractiveCanvasContext, Intents, Scenes } from '@contexts/InteractiveCanvasContext'

export { Intents, Scenes }

export default function useInteractiveCanvas() {
  const location = useLocation()
  const {
    sendTextQuery: realSendTextQuery,
    ...context
  } = useContext(InteractiveCanvasContext)

  const sendTextQuery = (query: string, state: Record<any, any> = {}) => {
    state.pathname = location.pathname
    return realSendTextQuery(query, state)
  }

  return {
    sendTextQuery,
    ...context
  }
}
