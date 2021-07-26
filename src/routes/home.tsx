/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
import WorkoutCard from '@components/ui/WorkoutCard'
import GameSection from '@components/ui/GameSection'
import UserBar from '@components/ui/UserBar'
import UserInfo from '@components/ui/UserInfo'
import commonStyles from '@styles/commonStyles'
import { GameConfig } from '@backend/models/config'
import { useHistory } from 'react-router-dom'
import { sendTextQuery } from '@store/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'

export default function Home({ games }: { games: GameConfig[] }): JSX.Element {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const [showAccountModal, setShowAccountModal] = useState(false)
  const handleAccountModalClose = () => setShowAccountModal(false)
  const handleAccountModalShow = () => setShowAccountModal(true)

  const handleLogout = () => {
    setShowAccountModal(false)
    //@ts-ignore
    dispatch(sendTextQuery({ query: 'Invoke User Logout' }))
  }

  // TODO launch workout function
  const handleClick = () => { window.location.href = 'https://lumos-assistant.ngrok.io' }

  const onGameClick = (slug: string) => {
    history.push(`/game/${slug}`)
  }

  return (
    <main>
      <div className={css(commonStyles.flexRowJustifyCenter, commonStyles.fullWidth, styles.topSpace)}>
        <div className={css(commonStyles.flexAlignCenter)}>
          <WorkoutCard clickHandler={handleClick} />
          <GameSection onClick={onGameClick} games={games} />
        </div>
      </div>
      <UserInfo
        show={showAccountModal}
        handleClose={handleAccountModalClose}
        logoutCallback={handleLogout}
      />
      <UserBar clickHandler={handleAccountModalShow} />
    </main>
  )
}

const styles = StyleSheet.create({
  topSpace: {
    height: '100%',
    marginTop: '10vmin'
  }
})
