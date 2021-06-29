import 'normalize.css'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NestHandler from '@components/NestHandler'
import Layout from '@components/ui/Layout'
import LoadingComponent from '@components/ui/LoadingComponent'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Nest</title>
      </Head>
      <LoadingComponent title=""/>
      <NestHandler />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
