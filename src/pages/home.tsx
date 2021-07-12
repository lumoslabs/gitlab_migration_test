import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { css, StyleSheet } from 'aphrodite/no-important'
import ConfigService from '@backend/services/ConfigService'
import WorkoutCard from '@components/ui/WorkoutCard'
import GameSection from '@components/ui/GameSection'
import UserBar from '@components/ui/UserBar'
import UserInfo from '@components/ui/UserInfo'
import commonStyles from '@styles/commonStyles'

export default function Home(): JSX.Element {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const service = new ConfigService()
  const games = await service.getCatalogGames()
  return {
    props: {
      games
    }
  }
}

const styles = StyleSheet.create({
  topSpace: {
    height: '100%',
    marginTop: '10vmin',
  }
})