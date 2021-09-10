import { useState } from 'react'
import { Property } from 'csstype'
import useAppBusListener from '@hooks/useAppBusListener'

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

export default function DebugBar() {
  const [log, setLog] = useState([])

  if (log.length === 0) {
    return <></>
  }

  useAppBusListener('onDebugLog', (data) => {
    setLog([
      data,
      ...log.slice(0, 19)
    ])
  })

  return <div style={debugBarStyle} >
    {log.join("\n")}
  </div>
}
