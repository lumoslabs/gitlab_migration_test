import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { css, StyleSheet } from 'aphrodite/no-important'
import WorkoutCard from '@components/ui/WorkoutCard'
import GameSection from '@components/ui/GameSection'
import UserBar from '@components/ui/UserBar'
import UserInfo from '@components/ui/UserInfo'
import commonStyles from '@styles/commonStyles'
import { GameConfig } from '@backend/services/ConfigService'
import { getTraining, getUser } from '@store/slices/appSlice'
import { useAppSelector } from '@store/hooks'
import useAmplitude from '@hooks/useAmplitude'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'
import useAppBusListener from '@hooks/useAppBusListener'

export default function Home({ games }: { games: GameConfig[] }): JSX.Element {

  const track = useAmplitude()
  const location = useLocation<{ tts: boolean }>()

  useEffect(() => {
    track('page_view')
  }, [])

  const history = useHistory()
  const training = useAppSelector(getTraining)
  const user = useAppSelector(getUser)
  const { outputTts } = useInteractiveCanvas()
  const [showAccountModal, setShowAccountModal] = useState(false)
  const handleAccountModalClose = () => setShowAccountModal(false)

  const onUserBarClick = () => {
    if (!user?.isLinked) {
      history.push('/account-linking')
    } else {
      setShowAccountModal(true)
    }
  }

  const handleClick = () => {
    history.push(`/training`)
  }

  const onGameClick = (slug: string) => {
    history.push(`/game/${slug}`)
  }

  useEffect(() => {
    if (location.state?.tts) {
      outputTts('Back to Main Menu. What would you like to do next?', true)
    }
  }, [])

  useAppBusListener('onIntentHelp', () => {
    outputTts('Here is what you can do: you can say "Play a game" to start a random game or "Start a workout" to play a series of three games. What would you like to do?')
  })

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
        name={user?.name}
        email={user?.email}
        profilePicUrl={user?.avatar}
        timezone={user?.timezone}
      />
      <UserBar clickHandler={onUserBarClick} name={user?.name} profilePicUrl={user?.avatar} />
    </main>
  )
}

const styles = StyleSheet.create({
  topSpace: {
    height: '100%',
    marginTop: '10vmin'
  }
})
