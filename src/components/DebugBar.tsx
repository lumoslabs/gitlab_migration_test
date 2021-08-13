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
  'maxWidth': '50%'
}

export default function DebugBar() {
  const [log, setLog] = useState([])

  useAppBusListener('onDebugLog', (data) => {
    setLog([
      data,
      ...log.slice(0, 19)
    ])
  })

  if (log.length === 0) {
    return <></>
  }
  return <div style={debugBarStyle} >
    {log.join("\n")}
  </div>
}
