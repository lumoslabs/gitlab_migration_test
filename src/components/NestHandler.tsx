import Script from 'next/script'
import getConfig from 'next/config'

function NestHandler(): JSX.Element {
  const { publicRuntimeConfig } = getConfig()

  /* eslint-disable */

  const onLoad = () => {
    const callbacks = {
      onUpdate(data: any[]) {
        console.log('onUpdate', data)
      },
      onTtsMark(markName: string) {
        console.log('onTtsMark', markName)
      },

    };

    window.interactiveCanvas.ready(callbacks)
  }

  /* eslint-enable */

  return <>
    <Script src={publicRuntimeConfig.interactiveCanvasLibUrl} onLoad={onLoad} />
  </>
}

export default NestHandler
