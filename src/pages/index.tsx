import { css, StyleSheet } from 'aphrodite/no-important'
import dynamic from 'next/dynamic'
import WorkoutCard from '@components/ui/WorkoutCard'
import GameSection from '@components/ui/GameSection'
import UserBar from '@components/ui/UserBar'
import UserInfo from '@components/ui/UserInfo'
import { useState } from 'react'
import commonStyles from '@styles/commonStyles'

export function Index(): JSX.Element {
  const [showAccountModal, setShowAccountModal] = useState(false)
  const handleAccountModalClose = () => setShowAccountModal(false)
  const handleAccountModalShow = () => setShowAccountModal(true)
  const handleLogout = () => {
    setShowAccountModal(false)
    // TODO: Handle logout
  }
  // TODO launch workout function
  const handleClick = () => { window.location.href = 'https://lumos-assistant.ngrok.io' }

  return (
    <main>
      <div className={css(commonStyles.flexRowJustifyCenter, commonStyles.fullWidth, styles.topSpace)}>
        <div className={css(commonStyles.flexAlignCenter)}>
          <WorkoutCard clickHandler={handleClick} />
          <GameSection />
        </div>
      </div>
      <UserInfo
        show={showAccountModal}
        handleClose={handleAccountModalClose}
        logoutCallback={handleLogout}
      />
      <UserBar clickHandler={handleAccountModalShow}/>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Index), {
  ssr: false
})

const styles = StyleSheet.create({
  topSpace: {
    height: '100%',
    marginTop: '10vmin',
  }
})

// const styles = StyleSheet.create({
//   app: {
//     width: '100%',
//     maxWidth: '100%',
//     height: '100vh',
//     minHeight: '84vh',
//     margin: '0',
//     padding: '0',
//     display: 'flex',
//     flexDirection: 'column',
//     overflowY: 'hidden',
//     background: `radial-gradient(ellipse 100% 0% at 100% 100%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%),
//     radial-gradient(ellipse 100% 0% at 0% -100%, rgb(34, 214, 214) 0%, rgb(115, 255, 211) 58%, rgba(115, 229, 255, 0) 100%),
//     radial-gradient(ellipse 100% 0% at 0% 100%, rgba(51, 156, 177, 0.2) 0%, rgba(51, 156, 177, 0) 100%),
//     radial-gradient(ellipse 100% 100% at 100% 0%, rgba(72, 223, 255, 0.7) 0%, rgba(51, 156, 177, 0) 100%, rgba(255, 255, 255, 0) 100%),
//     linear-gradient(-225deg, rgb(115, 229, 255) 0%, rgb(115, 229, 255) 4%, rgb(172, 240, 255) 23%, rgb(172, 240, 255) 70%, rgb(115, 229, 255) 100%),
//     radial-gradient(ellipse 100% 0% at 100% 100%, rgb(193, 236, 255) 0%, rgb(115, 229, 255) 100%)`,
//   },
//   header: {
//     width: '100%',
//     maxWidth: '100%',
//     margin: '0',
//     padding: '0',
//     backgroundColor: '#0C3040'
//   },
//   mainContent: {
//     padding: 0,
//     margin: 0,
//     width: '100%',
//     height: '100%',
//     maxWidth: '100%',
//     display: 'flex',
//     justifyContent: 'center'
//   },
//   footer: {
//     display: 'none'
//   },
//   iconImage: {
//     height: '13.66vh',
//     width: '31.25vw'
//   },
// })
