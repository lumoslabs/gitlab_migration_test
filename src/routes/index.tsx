import { css, StyleSheet } from 'aphrodite/no-important'
import LoadingComponent from '@components/ui/LoadingComponent'
import { useEffect } from 'react'
import useAmplitude from '@hooks/useAmplitude'
import { useHistory } from 'react-router-dom'

export function Index(): JSX.Element {

  const track = useAmplitude()
  const router = useHistory()
  useEffect(() => {
    track('page_view')
    router.push('/test')
  }, [])

  return (
    <main>
      <div className={css(styles.app)}>
        <div className={css(styles.mainContent)}>
          <LoadingComponent />
        </div>
      </div>
    </main>
  )
}

export default Index

const styles = StyleSheet.create({
  app: {
    width: '100%',
    maxWidth: '100%',
    height: '100vh',
    minHeight: '84vh',
    margin: '0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
    background: `radial-gradient(ellipse 100% 0% at 100% 100%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%),
    radial-gradient(ellipse 100% 0% at 0% -100%, rgb(34, 214, 214) 0%, rgb(115, 255, 211) 58%, rgba(115, 229, 255, 0) 100%),
    radial-gradient(ellipse 100% 0% at 0% 100%, rgba(51, 156, 177, 0.2) 0%, rgba(51, 156, 177, 0) 100%),
    radial-gradient(ellipse 100% 100% at 100% 0%, rgba(72, 223, 255, 0.7) 0%, rgba(51, 156, 177, 0) 100%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(-225deg, rgb(115, 229, 255) 0%, rgb(115, 229, 255) 4%, rgb(172, 240, 255) 23%, rgb(172, 240, 255) 70%, rgb(115, 229, 255) 100%),
    radial-gradient(ellipse 100% 0% at 100% 100%, rgb(193, 236, 255) 0%, rgb(115, 229, 255) 100%)`,
  },
  mainContent: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
})
