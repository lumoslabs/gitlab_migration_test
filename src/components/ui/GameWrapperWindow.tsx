import React, { forwardRef, useEffect, useImperativeHandle } from "react"

export interface GameWrapperProps {
  width: number,
  height: number
  url: string,
  vars: Record<string, any>
  visibility?: boolean
  onEvent: (name: string, data: any) => void,
  onError?: (e?: any) => void,
}

export interface GameWrapperRef {
  send: (data: any) => void,
}


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


const GameWrapperWindow = forwardRef<GameWrapperRef, GameWrapperProps>(({ width, height, url, vars, visibility = true, onEvent, onError = () => null }, ref): JSX.Element => {

  useEffect(() => {
    const script = document.createElement('script')
    script.setAttribute('id', 'gameScript')
    script.setAttribute('ref', 'gameScript')
    script.setAttribute('src', url)
    script.onerror = onError

    document.body.appendChild(script)

    window.Lumos = vars
    window.sendToJavaScript = (data: string | [string, GameEventData], argData: GameEventData | null) => {
      const [eventName, eventData] = (Array.isArray(data)) ? data : [data, argData]
      if (onEvent) {
        onEvent(eventName, eventData)
      }
    }
    return () => {
      document.body.removeChild(script)

      window.Lumos = {}

      window.sendToJavaScript = () => { return }

      // Clear cocos3 scope
      window?.cc?.director?.purgeCachedData()
      window?.cc?.director?.purgeDirector()
      window?.cc?.director?.end()
    }
  }, [])

  useImperativeHandle(ref, () => ({
    send(data) {
      if (window.sendEventToCocos) {
        window.sendEventToCocos(data)
      }
    }
  }))

  return <>
    <div className='cocos3' id='game-manager'>
      <canvas
        id='gameCanvas'
        style={{ visibility: visibility ? 'visible' : 'hidden' }}
        width={width}
        height={height}
      />
    </div>
  </>
})

export default GameWrapperWindow
