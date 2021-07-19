import { TtsMarkName, actions, getAppState, getIsStarted } from '@store/slices/appSlice'
import appSharedActions, { asSharedAction } from '@store/slices/appSharedActions'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { Property } from 'csstype'
import { useHistory } from "react-router-dom"
import { useEffect } from 'react'

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
  const isStarted = useAppSelector(getIsStarted)

  const router = useHistory()

  const debugState = useAppSelector(getAppState)

  const dispatch = useAppDispatch()

  const onLoad = () => {
    const callbacks = {
      onUpdate(data: unknown[]) {
        console.log('NestHandler onUpdate', data)
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
        console.log('onTtsMark', tts)
        if (!isStarted) {
          //hack for case when device already sent StartApp request
          dispatch(actions.setStarted())
        }
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
    window.interactiveCanvas.ready(callbacks)
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <>
      <div style={debugBarStyle}>
        {(`${JSON.stringify(debugState, null, 4)}`)}
      </div>
    </>
  )
}

export default NestHandler
