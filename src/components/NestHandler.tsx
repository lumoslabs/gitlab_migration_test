import { actions, getAppState } from '@store/slices/appSlice'
import appSharedActions, { asSharedAction } from '@store/slices/appSharedActions'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { Property } from 'csstype'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import getConfig from 'next/config'
import useAppBus from '@hooks/useAppBus'
import { TtsMarkName } from '@sharedTypes/interactiveCanvas'

const debugBarStyle = {
  'background': 'white',
  'opacity': .4,
  'position': 'absolute' as Property.Position,
  'whiteSpace': 'pre-wrap' as Property.WhiteSpace,
  'overflow': 'auto',
  'zIndex': '100' as Property.ZIndex,
  'right': '0px',
  'bottom': '0px',
  'top': '0px',
  'maxWidth': '30%'
}

function NestHandler(): JSX.Element {
  const { publicRuntimeConfig } = getConfig()

  const router = useHistory()
  const debugState = useAppSelector(getAppState)
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
        dispatch(actions.setTts({ tts }))
        appBus.emit('onTtsMark', tts)
      },
      onListeningModeChanged(data/*, reason*/) {
        if (data === 'CONTINUOUS_MATCH') {
          dispatch(actions.setContinuousMatchMode({ cmm: true }))
          appBus.emit('onListeningModeChanged', true)
        } else if (data === 'TURN_BASED') {
          appBus.emit('onListeningModeChanged', false)
          dispatch(actions.setContinuousMatchMode({ cmm: false }))
        }
      },
      onPhraseMatched(data) {
        appBus.emit('onPhraseMatched', data)
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
