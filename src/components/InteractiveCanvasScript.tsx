import getConfig from 'next/config'
import InteractiveCanvasProxySource from "@assets/interactiveCanvasProxy.js?raw"

function InteractiveCanvasScript(): JSX.Element {
  const { publicRuntimeConfig } = getConfig()
  return <>
    <script src={publicRuntimeConfig.interactiveCanvasLibUrl} />
    <script dangerouslySetInnerHTML={{ __html: InteractiveCanvasProxySource }} />
  </>
}

export default InteractiveCanvasScript
