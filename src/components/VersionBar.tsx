import { Property } from 'csstype'
import getConfig from 'next/config'

const versionBarStyle = {
  'background': 'black',
  'color': 'white',
  'position': 'absolute' as Property.Position,
  'whiteSpace': 'pre-wrap' as Property.WhiteSpace,
  'overflow': 'auto',
  'zIndex': '100' as Property.ZIndex,
  'right': '0px',
  'top': '0px',
  'maxHeight': '30px'
}

export default function VersionBar() {
  const { publicRuntimeConfig } = getConfig()
  console.log('publicRuntimeConfig.versionBar', publicRuntimeConfig)
  if (!publicRuntimeConfig.versionBar) {
    return <></>
  }

  return <div style={versionBarStyle} >
    {publicRuntimeConfig.versionBar}
  </div>
}
