import 'normalize.css'
import '@styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NestHandler from '@components/NestHandler'
import Layout from '@components/ui/Layout'
import { Provider } from 'react-redux'
import store from '@store/index'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Nest</title>
        </Head>
        <NestHandler />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
