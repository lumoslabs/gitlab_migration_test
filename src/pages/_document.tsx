import Document, { Html, Head, Main, NextScript } from 'next/document'
import Rollbar from '@components/Rollbar'
import InteractiveCanvasScript from '@components/InteractiveCanvasScript'
import Amplitude from '@components/Amplitude'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <InteractiveCanvasScript />
          <Rollbar />
          <Amplitude />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
