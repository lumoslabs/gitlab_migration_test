import Script from 'next/script'
import getConfig from 'next/config'

import { TtsMarkName, actions, getTts, getIsStarted } from '@store/slices/appSlice'
import { asSharedAction } from '@store/slices/appSharedActions'

import { useAppSelector, useAppDispatch } from '@store/hooks'

function NestHandler(): JSX.Element {
  const { publicRuntimeConfig } = getConfig()

  //debug bar for state manage schema
  const tts = useAppSelector(getTts)
  const isStarted = useAppSelector(getIsStarted)

  const dispatch = useAppDispatch()
  const onLoad = () => {
    const callbacks = {
      onUpdate(data: unknown[]) {
        data.forEach((row) => {
          const sharedAction = asSharedAction(row)
          if (sharedAction) {
            dispatch(actions[sharedAction.command]())
          }
        })
      },
      onTtsMark(tts: TtsMarkName) {
        dispatch(actions.setTts({ tts }))
      },
    };
    window.interactiveCanvas.ready(callbacks)
  }

  return <>
    <p>
      tts: {tts} -
      isStarted: {isStarted ? 'true' : 'false'}
    </p>
    <Script src={publicRuntimeConfig.interactiveCanvasLibUrl} onLoad={onLoad} />
  </>
}

export default NestHandler
