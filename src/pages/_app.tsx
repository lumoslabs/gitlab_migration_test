import 'normalize.css'
import '@styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '@components/ui/Layout'
import { Provider } from 'react-redux'
import createAppStore from '@store/index'

const store = createAppStore()

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Lumosity Google Assistant</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
