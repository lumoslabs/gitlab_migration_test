import Script from 'next/script'
import getConfig from 'next/config'

import { TtsMarkName, actions, getTts, getIsStarted, getContinuosMatchMode } from '@store/slices/appSlice'
import appSharedActions, { asSharedAction } from '@store/slices/appSharedActions'

import { useAppSelector, useAppDispatch } from '@store/hooks'

import { useRouter } from 'next/router'

function NestHandler(): JSX.Element {
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()

  //debug bar for state manage schema
  const tts = useAppSelector(getTts)
  const isStarted = useAppSelector(getIsStarted)
  const cmm = useAppSelector(getContinuosMatchMode)


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
        // Handle mode values: 'TURN_BASED', 'CONTINUOUS_MATCH'
        if (data === 'CONTINUOUS_MATCH') {
          dispatch(actions.setContinuosMatchMode({ cmm: true }))
          // Handle the start of Continuous Match mode
        } else if (data === 'TURN_BASED') {
          dispatch(actions.setContinuosMatchMode({ cmm: false }))
        }
      },
      onPhraseMatched(data) {
        dispatch(actions.setParsedPhrase({ phrase: data }))
      },

    }
    window.interactiveCanvas.ready(callbacks)
  }

  return (
    <>
      {(`tts: ${tts} - isStarted: ${isStarted ? 'true' : 'false'} cmm - ${cmm ? 'true' : 'false'}`)}
      <Script src={publicRuntimeConfig.interactiveCanvasLibUrl} onLoad={onLoad} />
    </>
  )
}

export default NestHandler
