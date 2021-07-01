import 'normalize.css'
import '@styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NestHandler from '@components/NestHandler'
import Layout from '@components/ui/Layout'
import LoadingComponent from '@components/ui/LoadingComponent'
import GameProgressBar from '@components/ui/GameProgressBar'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Nest</title>
      </Head>
      <LoadingComponent title=""/>
      <NestHandler />
      <Component {...pageProps} />
      <GameProgressBar name='Train of Thought' progressLevel={50} />
    </Layout>
  )
}

export default MyApp
