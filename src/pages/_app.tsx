import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '@components/ui/Layout'
import { Provider } from 'react-redux'
import createAppStore from '@store/index'
import VersionBar from '@components/VersionBar'

const store = createAppStore()

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <VersionBar />
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
