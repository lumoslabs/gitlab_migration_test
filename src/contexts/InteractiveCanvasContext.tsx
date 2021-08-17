import React, { useEffect, useState } from 'react'
import { TtsMarkName } from '@sharedTypes/interactiveCanvas'
import appSharedActions, { asSharedAction } from '@store/slices/appSharedActions'
import useAppBus from '@hooks/useAppBus'
import { useAppDispatch } from '@store/hooks'
import { actions } from '@store/slices/appSlice'
import { useHistory } from 'react-router-dom'

export enum Intents {
  AGE_GATE_RESULT = 'a9e9ate-ca767bf1-0239-4adb-89dc',
  LINK_ACCOUNT = 'l1nk-11c0unt-3cff-4eba-5ac9abbfab8c',
  PLAY_SCORE = 'p1ay-sc0re-ff74-11eb-9a03-0242ac130003',
  RESTART_CMM = 'r3sta5t-cmm-ff74-11eb-9a03-da66ffd11cd4',
  START_GAME = 's5ar5g0me-ff74-11eb-9a03-0242ac130003'
}

class InteractiveCanvas {

  ccmMode = false
  exitCmmModeResolvers = []

  outputTts = async (text: string, prompt = false) => {
    try {
      window.interactiveCanvas?.outputTts(text, prompt)
    } catch (e) {
      console.error('interactiveCanvas - outputTts - exception', e)
    }
  }

  exitContinuousMatchMode = async (): Promise<void> => {
    return new Promise((resolve) => {
      if (this.ccmMode) {
        try {
          this.exitCmmModeResolvers.push(resolve)
          window.interactiveCanvas?.exitContinuousMatchMode()
        } catch (e) {
          console.error('interactiveCanvas - exitContinuousMatchMode - exception', e)
        }
      } else {
        resolve()
      }
    })
  }

  sendTextQuery = async (query: string, state: Record<any, any> = {}) => {
    window.interactiveCanvas?.setCanvasState({
      ...state
    })
    const result = await window.interactiveCanvas?.sendTextQuery(query)
    if (result !== 'SUCCESS') {
      console.error('interactiveCanvas - sendTextQuery - incorrect result', { query, state }, result)
    }
    return result as string
  }

  onListeningModeChanged = (data, _reason) => {
    if (data === 'CONTINUOUS_MATCH') {
      this.ccmMode = true
    } else if (data === 'TURN_BASED') {
      this.ccmMode = false
      this.exitCmmModeResolvers.forEach((resolve) => {
        resolve()
      })
      this.exitCmmModeResolvers = []
    }
  }
}

export const InteractiveCanvasContext = React.createContext<InteractiveCanvas>(null)
const P = InteractiveCanvasContext.Provider

export default function InteractiveCanvasProvider({ children }) {
  const [interactiveCanvas] = useState(() => new InteractiveCanvas())
  const router = useHistory()
  const dispatch = useAppDispatch()
  const appBus = useAppBus()

  const onLoad = () => {
    const callbacks = {
      onUpdate(data: unknown[]) {
        data.forEach((row) => {
          const action = asSharedAction(row)
          if (action && actions[action.command]) {
            dispatch(actions[action.command](action.payload))
          }
          if (action.command == appSharedActions.GO_TO) {
            router.push(action.payload)
          }
          if ((action.command == appSharedActions.EMIT_EVENT) && (action.payload)) {
            appBus.emit(action.payload)
          }
        })
      },
      onTtsMark(tts: TtsMarkName) {
        appBus.emit('onTtsMark', tts)
      },
      onListeningModeChanged(data, reason) {
        interactiveCanvas.onListeningModeChanged(data, reason)
        if (data === 'CONTINUOUS_MATCH') {
          appBus.emit('onListeningModeChanged', true)
        } else if (data === 'TURN_BASED') {
          appBus.emit('onListeningModeChanged', false)
        }
      },
      onPhraseMatched(data) {
        appBus.emit('onPhraseMatched', data)
      },
    }
    window?.interactiveCanvasProxy?.ready(callbacks)
  }

  useEffect(() => {
    onLoad()
  }, [])

  return <P value={interactiveCanvas}>{children}</P>
}
