import { forwardRef, useCallback, useLayoutEffect, useRef, useImperativeHandle } from "react"
import iframeContent from '@assets/iframe.html?raw'
import { GameWrapperProps, GameWrapperRef } from './GameWrapperWindow'

const GameWrapperIframe = forwardRef<GameWrapperRef, GameWrapperProps>(({ width, height, onEvent, onError = () => null, url, vars, visibility = true }, ref): JSX.Element => {
  const iframe = useRef<any>()

  const sendToIframe = useCallback((data: Record<string, any>) => {
    data.lumos = true
    iframe.current?.contentWindow?.postMessage(data, '*')
  }, [])

  const onIframeLoad = useCallback(() => {
    sendToIframe({
      command: 'init',
      height,
      width,
      url,
      vars
    })
  }, [])

  const onMessageEvent = useCallback((message) => {
    if (!message?.data?.lumos) {
      return
    }
    const { eventName, eventData } = message.data
    onEvent(eventName, eventData)
  }, [])

  useLayoutEffect(() => {
    window.addEventListener('message', onMessageEvent)
    return () => {
      window.removeEventListener('message', onMessageEvent)
      iframe.current?.setAttribute('srcdoc', null)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    send(data) {
      sendToIframe({
        command: 'send',
        data
      })
    }
  }))

  return <>
    <iframe
      style={{ visibility: visibility ? 'visible' : 'hidden', overflow: 'hidden' }}
      allow="autoplay"
      sandbox="allow-same-origin allow-scripts"
      frameBorder="0"
      onLoad={onIframeLoad}
      onError={onError}
      ref={iframe}
      width={width}
      height={height}
      srcDoc={iframeContent}
    ></iframe>
  </>
})

export default GameWrapperIframe
