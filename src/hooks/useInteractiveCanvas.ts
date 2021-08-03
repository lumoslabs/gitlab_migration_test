import { useLocation } from 'react-router-dom'

export default function useInteractiveCanvas() {
  const location = useLocation()

  const outputTts = (text: string, prompt: boolean = false) => {
    try {
      window.interactiveCanvas?.outputTts(text, prompt)
    } catch (e) {
      console.error('interactiveCanvas - outputTts - exception', e)
    }
  }

  const exitContinuousMatchMode = () => {
    try {
      window.interactiveCanvas?.exitContinuousMatchMode()
    } catch (e) {
      console.error('interactiveCanvas - exitContinuousMatchMode - exception', e)
    }
  }

  const sendTextQuery = async (query: string, state: Record<any, any> = {}) => {
    window.interactiveCanvas?.setCanvasState({
      ...state,
      pathname: location.pathname
    })
    const result = await window.interactiveCanvas?.sendTextQuery(query)
    if (result !== 'SUCCESS') {
      console.error('interactiveCanvas - sendTextQuery - incorrect result', { query, state }, result)
    }
    return result as string
  }

  return {
    outputTts,
    exitContinuousMatchMode,
    sendTextQuery
  }
}
