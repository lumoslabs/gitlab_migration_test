import { useState } from 'react'
import { Property } from 'csstype'
import useAppBusListener from '@hooks/useAppBusListener'
import { useEffect } from 'react'

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
  'maxWidth': '50%',
  'fontSize': '24px'
}

export default function DebugBar() {
  const [log, setLog] = useState([])
  const [jsHeapSizeLimit, setJsHeapSizeLimit] = useState(0)
  const [totalJSHeapSize, setTotalJSHeapSize] = useState(0)
  const [usedJSHeapSize, setUsedJSHeapSize] = useState(0)

  useAppBusListener('onDebugLog', (data) => {
    setLog([
      data,
      ...log.slice(0, 19)
    ])
  })

  useEffect(() => {
    const interval = setInterval(() => {
      //@ts-ignore
      setJsHeapSizeLimit((window.performance?.memory?.jsHeapSizeLimit / 1048576).toFixed(2))
      //@ts-ignore
      setTotalJSHeapSize((window.performance?.memory?.totalJSHeapSize / 1048576).toFixed(2))
      //@ts-ignore
      setUsedJSHeapSize((window.performance?.memory?.usedJSHeapSize / 1048576).toFixed(2))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div style={debugBarStyle} >
    <p>jsHeapSizeLimit: {jsHeapSizeLimit}</p>
    <p>totalJSHeapSize: {totalJSHeapSize}</p>
    <p>usedJSHeapSize: {usedJSHeapSize}</p>
  </div>
}
