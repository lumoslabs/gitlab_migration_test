import { TtsMarkName, actions, getAppState } from '@store/slices/appSlice'
import appSharedActions, { asSharedAction } from '@store/slices/appSharedActions'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { Property } from 'csstype'
import { useHistory } from "react-router-dom"
import { useEffect } from 'react'
import getConfig from 'next/config'

const debugBarStyle = {
  'background': 'white',
  'position': 'absolute' as Property.Position,
  'whiteSpace': 'pre-wrap' as Property.WhiteSpace,
  'overflow': 'auto',
  'border': '1px red solid',
  'zIndex': '100' as Property.ZIndex,
  'right': '0px',
  'bottom': '0px',
  'maxWidth': '40%'
}

function NestHandler(): JSX.Element {
  const { publicRuntimeConfig } = getConfig()

  const router = useHistory()
  const debugState = useAppSelector(getAppState)
  const dispatch = useAppDispatch()

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
        })
      },
      onTtsMark(tts: TtsMarkName) {
        dispatch(actions.setTts({ tts }))
        dispatch(actions.setGameCommand({ action: 'tts_' + tts.toLowerCase() }))
      },
      onListeningModeChanged(data, reason) {
        console.log("onListeningModeChanged: " + data)
        console.log("Change reason: " + reason)
        if (data === 'CONTINUOUS_MATCH') {
          dispatch(actions.setContinuousMatchMode({ cmm: true }))
          dispatch(actions.setGameCommand({ action: 'cmm_start' }))
        } else if (data === 'TURN_BASED') {
          //TODO: if-else for reasoning, restart it on timeout?
          dispatch(actions.setContinuousMatchMode({ cmm: false }))
          dispatch(actions.setGameCommand({ action: 'cmm_end' }))
          //          if (reason === 'CONTINUOUS_MATCH_USER_EXIT') {
          //          } else {
          //restart cmm
          //          }
        }
      },
      onPhraseMatched(data) {
        dispatch(actions.setGameCommand(data))
      },
    }
    window.interactiveCanvasProxy.ready(callbacks)
  }

  useEffect(() => {
    if (window.interactiveCanvasProxy) {
      onLoad()
    } else {
      console.error('Interactive Canvas doesn\'t exists')
    }
  }, [])

  return (
    <>
      {
        publicRuntimeConfig.debugBar &&
        <div style={debugBarStyle}>
          {(`${JSON.stringify(debugState, null, 4)}`)}
        </div>
      }
    </>
  )
}

export default NestHandler
