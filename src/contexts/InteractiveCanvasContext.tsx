import React, { useEffect, useState } from 'react'
//import appSharedActions, { asSharedAction } from '@store/slices/appSharedActions'
import useAppBus from '@hooks/useAppBus'
import { useAppDispatch } from '@store/hooks'
//import { actions } from '@store/slices/appSlice'
import { useHistory } from 'react-router-dom'

export enum Intents {
  GUEST = 'GUEST',
  HELP = 'HELP',
  HOME = 'HOME',
  OPEN_GAME = 'OPEN_GAME',
  RESTART_GAME = 'RESTART_GAME',
  RESUME_GAME = 'RESUME_GAME',
  NO = 'NO',
  YES = 'YES',
  TRAINING = 'TRAINING',
}

export enum Scenes {
  InitialScene = 'InitialScene',
  Main = 'MainScene',
  AgeGate = 'AgeGate',
  AccountLinkingOrigin = 'AccountLinkingOrigin',
  AccountLinkingOriginAccountLinking = 'AccountLinkingOrigin_AccountLinking', //TODO: rename to normal name
  EndConversation = 'EndConversation',
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

  enterContinuousMatchMode = async (phrases: any[], timeout?: number): Promise<void> => {
    return new Promise((resolve) => {
      window.interactiveCanvas?.enterContinuousMatchMode(phrases, timeout || 180);
      resolve()
    })
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

  triggerScene = (scene: string) => {
    return window.interactiveCanvas?.triggerScene(scene)
  }

  expect = (intentId: string, callback: any) => {
    const handler = window.interactiveCanvas?.createIntentHandler(intentId, callback)
    return window.interactiveCanvas?.expect(handler)
  }

  clearExpectations = () => {
    return window.interactiveCanvas?.clearExpectations()
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
        console.log('onUpdate', data)
        /*
      data.forEach((row) => {
//          const action = asSharedAction(row)
                  if (action && actions[action.command]) {
                    //            dispatch(actions[action.command](action.payload))
                  }
                  if (action.command == appSharedActions.GO_TO) {
                    console.log('goto', action)
                    //            router.push(action.payload)
                  }
                  if ((action.command == appSharedActions.EMIT_EVENT) && (action.payload)) {
                    //            appBus.emit(action.payload)
                  }
      })
        */
      },
      onTtsMark(markName) {
        appBus.emit('onTtsMark', markName)
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
