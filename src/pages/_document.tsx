import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'
import { StyleSheetServer } from 'aphrodite'

interface IMyDocumentInitialProps {
  css: {
    content: string;
    renderedClassNames: string[];
  };
}

class MyDocument extends Document<IMyDocumentInitialProps & DocumentInitialProps>{
  static async getInitialProps(ctx: DocumentContext): Promise<IMyDocumentInitialProps & DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    const renderPage = await ctx.renderPage()
    const { css } = StyleSheetServer.renderStatic(() => renderPage.html)
    return { css, ...initialProps }
  }

  render(): JSX.Element {
    const { css } = this.props
    return (
      <Html>
        <Head>
          <style
            data-aphrodite
            dangerouslySetInnerHTML={{ __html: css.content }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {css.renderedClassNames && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.__REHYDRATE_IDS = ${JSON.stringify(css.renderedClassNames)}
                `,
              }}
            />
          )}
        </body>
      </Html>
    )
  }

}


export default MyDocument
