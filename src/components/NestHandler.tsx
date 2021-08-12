import { actions } from '@store/slices/appSlice'
import appSharedActions, { asSharedAction } from '@store/slices/appSharedActions'
import { useAppDispatch } from '@store/hooks'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import useAppBus from '@hooks/useAppBus'
import { TtsMarkName } from '@sharedTypes/interactiveCanvas'
import useDebugBar from '@hooks/useDebugBar'

function NestHandler(): JSX.Element {

  const router = useHistory()
  const dispatch = useAppDispatch()
  const appBus = useAppBus()
  const logger = useDebugBar()

  const onLoad = () => {
    const callbacks = {
      onUpdate(data: unknown[]) {
        data.forEach((row) => {
          const action = asSharedAction(row)
          logger('webhook action', action)
          if (action && actions[action.command]) {
            dispatch(actions[action.command](action.payload))
          }
          if (action && (action.command == appSharedActions.GO_TO)) {
            router.push(action.payload)
          }
          if (action && (action.command == appSharedActions.EMIT_EVENT) && (action.payload)) {
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
    <></>
  )
}

export default NestHandler
