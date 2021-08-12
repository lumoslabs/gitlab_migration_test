import { useEffect } from 'react'
import useDebugBar from './useDebugBar'

export interface GameSpeechData {
  text: string,
  prompt: boolean
}

export interface GameCompletedData {
  score: number;
  session_level: number;
  user_level: number;
  game_result_data: unknown;
}

export type GameEventData = number | GameCompletedData | GameSpeechData | null

export default function useGameCallbacks(gameEventHandler: (eventName: string, eventData: GameEventData) => void): {
  sendEventToCocos: (data) => void,
  sendFakeCompleteEvent: () => void,
} {

  const logger = useDebugBar()

  useEffect(() => {
    window.sendToJavaScript = (data: string | [string, GameEventData], argData: GameEventData | null) => {
      let [eventName, eventData] = (Array.isArray(data)) ? data : [data, argData]
      if (gameEventHandler) {
        gameEventHandler(eventName, eventData)
      }
    }
    return () => {
      //eslint-disable-next-line @typescript-eslint/no-empty-function
      window.sendToJavaScript = () => { }
    }
  }, [])

  const sendFakeCompleteEvent = () => {
    if (window.sendToJavaScript) {
      window.sendToJavaScript('game:complete', { score: Math.floor(Math.random() * 1000) })
    }
  }

  const sendEventToCocos = (data: any) => {
    logger('sendEventToCocos', data)
    if (window.sendEventToCocos) {
      window.sendEventToCocos(data)
    }
  }

  return { sendEventToCocos, sendFakeCompleteEvent }
}
