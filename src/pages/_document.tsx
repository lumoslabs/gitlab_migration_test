import Document, { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import Rollbar from '@components/Rollbar'
import InteractiveCanvasScript from '@components/InteractiveCanvasScript'
import Amplitude from '@components/Amplitude'

import { StyleSheetServer } from 'aphrodite'

interface DocumentPropsWithAphrodite extends DocumentProps {
  css: {
    content: string;
    renderedClassNames: string[];
  };
}

class MyDocument extends Document<DocumentPropsWithAphrodite> {

  static async getInitialProps(ctx): Promise<DocumentPropsWithAphrodite> {
    const { html, css } = StyleSheetServer.renderStatic(() => ctx.renderPage())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return { ...html, css }
  }

  render(): JSX.Element {
    const { css } = this.props
    return (
      <Html>
        <Head>
          <InteractiveCanvasScript />
          <Rollbar />
          <Amplitude />
          <link rel="shortcut icon" type="image/x-icon" href="data:image/x-icon;," />

        </Head>
        <body>
          <Main />
          <NextScript />
          <style
            data-aphrodite
            dangerouslySetInnerHTML={{ __html: css.content }}
          />
          {css?.renderedClassNames && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.__REHYDRATE_IDS = ${JSON.stringify(css.renderedClassNames)}
                `,
              }}
            />
          )}
        </body>
      </Html >
    )
  }
}

export default MyDocument
