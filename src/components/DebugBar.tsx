import { useEffect, useState } from 'react'
import { Property } from 'csstype'
import useAppBusListener from '@hooks/useAppBusListener'
import { useAppSelector } from '@store/hooks'
import { useLocation } from 'react-router-dom'

const debugBarStyle = {
  'background': 'white',
  'opacity': .8,
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
  const [storageString, setStorageString] = useState('')
  const location = useLocation()
  const storage = useAppSelector((state) => state)
  useAppBusListener('onDebugLog', (data) => {
    setLog([
      data,
      ...log.slice(0, 19)
    ])
  })

  useEffect(() => {
    setStorageString(JSON.stringify(storage, undefined, 4))
  }, [storage])

  return <div style={debugBarStyle}>
    {location.pathname} <br />
    {storageString}
    {log.join("\n")}
  </div>
}
