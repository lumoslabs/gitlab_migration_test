import Document, { Html, Head, Main, NextScript } from 'next/document'
import Rollbar from '@components/Rollbar'
import InteractiveCanvasScript from '@components/InteractiveCanvasScript'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <InteractiveCanvasScript />
          <Rollbar />
          <script dangerouslySetInnerHTML={{
            __html: `
              console.log = () => {}
            `
          }} />
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
