import type { AppProps } from 'next/app'

function Layout({ Component }: AppProps): JSX.Element {
  return <>
    <main>
      <Component />
    </main>
  </>
}

export default Layout
