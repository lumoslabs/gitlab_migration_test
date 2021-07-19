import getConfig from 'next/config'

function InteractiveCanvasScript(): JSX.Element {
  const { publicRuntimeConfig } = getConfig()
  return <>
    <script src={publicRuntimeConfig.interactiveCanvasLibUrl} />
  </>
}



export default InteractiveCanvasScript
