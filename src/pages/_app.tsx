import 'normalize.css'
import '@styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import NestHandler from '@components/NestHandler'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <>
    <Head>
      <title>Nest</title>
    </Head>
    <NestHandler />
    <Component {...pageProps} />
  </>
}

export default MyApp
