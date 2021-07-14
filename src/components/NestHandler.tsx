import Script from 'next/script'
import getConfig from 'next/config'

import { TtsMarkName, actions, getAppState } from '@store/slices/appSlice'
import appSharedActions, { asSharedAction } from '@store/slices/appSharedActions'

import { useAppSelector, useAppDispatch } from '@store/hooks'

import { Property } from 'csstype'

import { useRouter } from 'next/router'

const debugBarStyle = {
  "background": "white",
  "position": 'absolute' as Property.Position,
  "whiteSpace": "pre-wrap" as Property.WhiteSpace,
  "overflow": "auto",
  "border": "1px red solid",
  "zIndex": "100" as Property.ZIndex,
  "right": "0px",
  "bottom": "0px",
}

function NestHandler(): JSX.Element {
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()

  const debugState = useAppSelector(getAppState)

  const dispatch = useAppDispatch()

  const onLoad = () => {
    const callbacks = {
      onUpdate(data: unknown[]) {
        data.forEach((row) => {
          const action = asSharedAction(row)
          if (action && actions[action.command]) {
            dispatch(actions[action.command]())
          }
          if (action.command == appSharedActions.GO_TO) {
            router.push(action.payload)
          }
        })
      },
      onTtsMark(tts: TtsMarkName) {
        dispatch(actions.setTts({ tts }))
      },
      onListeningModeChanged(data, reason) {
        console.log("onListeningModeChanged: " + data)
        console.log("Change reason: " + reason)
        if (data === 'CONTINUOUS_MATCH') {
          dispatch(actions.setContinuousMatchMode({ cmm: true }))
          dispatch(actions.setGameCommand({ action: 'cmm_start' }))
        } else if (data === 'TURN_BASED') {
          dispatch(actions.setContinuousMatchMode({ cmm: false }))
          dispatch(actions.setGameCommand({ action: 'cmm_stop' }))
        }
      },
      onPhraseMatched(data) {
        dispatch(actions.setGameCommand(data))
      },

    }
    window.interactiveCanvas.ready(callbacks)
  }

  return (
    <>
      <div style={debugBarStyle}>
        {(`${JSON.stringify(debugState, null, 4)}`)}
      </div>
      <Script src={publicRuntimeConfig.interactiveCanvasLibUrl} onLoad={onLoad} />
    </>
  )
}

export default NestHandler
