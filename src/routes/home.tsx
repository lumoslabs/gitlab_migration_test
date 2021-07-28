/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { css, StyleSheet } from 'aphrodite/no-important'
import WorkoutCard from '@components/ui/WorkoutCard'
import GameSection from '@components/ui/GameSection'
import UserBar from '@components/ui/UserBar'
import UserInfo from '@components/ui/UserInfo'
import commonStyles from '@styles/commonStyles'
import { GameConfig } from '@backend/models/config'
import { getTraining, sendTextQuery } from '@store/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import useAmplitude from '@hooks/useAmplitude'

export default function Home({ games }: { games: GameConfig[] }): JSX.Element {

  const track = useAmplitude()

  useEffect(() => {
    track('page_view')
  }, [])

  const history = useHistory()
  const dispatch = useAppDispatch()
  const training = useAppSelector(getTraining)

  const [showAccountModal, setShowAccountModal] = useState(false)
  const handleAccountModalClose = () => setShowAccountModal(false)
  const handleAccountModalShow = () => setShowAccountModal(true)

  const handleLogout = () => {
    setShowAccountModal(false)
    //@ts-ignore
    dispatch(sendTextQuery({ query: 'Invoke User Logout' }))
  }

  const handleClick = () => {
    history.push(`/training`)
  }

  const onGameClick = (slug: string) => {
    history.push(`/game/${slug}`)
  }

  return (
    <main>
      <div className={css(commonStyles.flexRowJustifyCenter, commonStyles.fullWidth, styles.topSpace)}>
        <div className={css(commonStyles.flexAlignCenter)}>
          <WorkoutCard
            totalGameCount={training?.size}
            remainingGamesCount={training?.games?.length}
            clickHandler={handleClick}
          />
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
