import { useCallback, useEffect, useRef, useState } from "react"
import GameProgressBar from '@components/ui/GameProgressBar'
import iframeContent from '@assets/iframe.html?raw'

export default function test(): JSX.Element {
  const iframe = useRef()
  const [clientHeight, setHeight] = useState(0)
  const [clientWidth, setWidth] = useState(0)
  const [progressLevel, setProgressLevel] = useState(0)
  const [showProgress, setShowProgress] = useState(true)


  const eventListener = (message) => {
    if (!message?.data?.lumos) {
      return
    }
    let { eventName, eventData } = message.data
    switch (eventName) {
      case 'game:loadStart':
        setShowProgress(true)
        break
      case 'game:loadProgress':
        eventData = Math.floor(Number(eventData) * 100)
        if (eventData > progressLevel) {
          setProgressLevel(eventData)
        }
        break
      case 'game:loadComplete':
        break
      case 'game:start':
        setShowProgress(false)
        break
    }
  }

  useEffect(() => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)

    window.addEventListener('message', eventListener)
    return () => {
      window.removeEventListener('message', eventListener)
    }
  }, [])

  const sendToIframe = useCallback((data: Record<string, any>) => {
    data.lumos = true
    iframe?.current?.contentWindow?.postMessage(data, '*')
  }, [])


  const onIframeLoad = useCallback(() => {
    console.log('loaded', iframe.current)
    sendToIframe({
      command: 'init',
      height: clientHeight,
      width: clientWidth,
      src: 'https://assets.nest.lumosity.com/game-assets/ColorMatch_CC/nest_lowres/a213a4c63155fa5fde7fbe266d42654a33b71a56/289067450/release/game.js'
    })
  }, [])



  return <>
    <div style={{ visibility: showProgress ? 'hidden' : 'visible' }}>
      <iframe sandbox="allow-scripts" frameBorder="0" onLoad={onIframeLoad} ref={iframe} width={clientWidth} height={clientHeight} src="/game.html" />
    </div>
    {showProgress && <GameProgressBar progressLevel={progressLevel} />}
  </>
}
