import getConfig from 'next/config'

function InteractiveCanvasScript(): JSX.Element {
  const { publicRuntimeConfig } = getConfig()
  return <>
    <script src={publicRuntimeConfig.interactiveCanvasLibUrl} />
    <script src={'/assets/interactive_canvas_proxy.js'} />
  </>
}



export default InteractiveCanvasScript
