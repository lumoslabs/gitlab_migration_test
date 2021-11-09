import { useEffect, useState } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
import WorkoutCard from '@components/ui/WorkoutCard'
import GameSection from '@components/ui/GameSection'
import UserBar from '@components/ui/UserBar'
import UserInfo from '@components/ui/UserInfo'
import commonStyles from '@styles/commonStyles'
import { GameConfig } from '@backend/services/ConfigService'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { selectUser, selectUserIsFirstLogin, selectUserIsLinked } from '@store/slices/user'
import useAmplitude from '@hooks/useAmplitude'
import useInteractiveCanvas, { Intents } from '@hooks/useInteractiveCanvas'
import useNavigation from '@hooks/useNavigation'

import sample from 'lodash.sample'
import { selectTraining } from '@store/slices/training'
import useExpect from '@hooks/useExpect'
import { selectWelcomeState, setWelcomeState } from '@store/slices/session'

export default function Home({ games }: { games: GameConfig[] }): JSX.Element {

  const track = useAmplitude()
  const { outputTts } = useInteractiveCanvas()
  const navigation = useNavigation()
  const user = useAppSelector(selectUser)
  const isLinked = useAppSelector(selectUserIsLinked)
  const training = useAppSelector(selectTraining)
  const isWelcomeState = useAppSelector(selectWelcomeState)
  const isFirstLogin = useAppSelector(selectUserIsFirstLogin)
  const dispatch = useAppDispatch()

  useExpect(Intents.HELP, () => {
    outputTts('Here is what you can do: you can say "Play a game" to start a random game or "Start a workout" to play a series of three games. What would you like to do?', true)
  })

  useExpect(Intents.TRAINING, () => {
    onTrainingClick()
  })

  useExpect(Intents.OPEN_GAME, (matchedIntent) => {
    const gameName = matchedIntent.getIntentArg('game_name') || ''
    const game = games.find((game) => {
      return game.intent_name === gameName.toLowerCase()
    }) || sample(games)
    onGameClick(game.values.slug)
  })

  useExpect(Intents.GUEST, () => {
    onUserBarClick()
  })

  useEffect(() => {
    track('page_view')
    if (isWelcomeState) {
      dispatch(setWelcomeState())
      if (isFirstLogin && training?.games?.length > 0) {
        outputTts('Welcome to Lumosity. You can say play a game or do a workout. What would you like to do today?')
      } else {
        if (isLinked || training.games.length <= 0) {
          outputTts('Welcome back. What would you like to do today?')
        } else {
          outputTts(`Welcome back. By the way, your score and progress will not be saved until you link your Lumosity account.
           If you would like to link your Lumosity account, you can say Guest or tap “Guest” on the Main Menu. 
           What would you like to do today?`)
        }
      }
    }
  }, [])

  const [showAccountModal, setShowAccountModal] = useState(false)
  const handleAccountModalClose = () => setShowAccountModal(false)

  const onGameClick = (slug: string) => {
    navigation.toGame(slug)
  }

  const onUserBarClick = () => {
    if (!isLinked) {
      navigation.toAccountLinking()
    } else {
      setShowAccountModal(true)
    }
  }

  const onTrainingClick = () => {
    navigation.toTraining()
  }

  return (
    <main>
      <div className={css(commonStyles.flexRowJustifyCenter, commonStyles.fullWidth, styles.topSpace)}>
        <div className={css(commonStyles.flexAlignCenter)}>
          <WorkoutCard
            totalGameCount={training?.size}
            remainingGamesCount={training?.games?.length}
            clickHandler={onTrainingClick}
          />
          <GameSection onClick={onGameClick} games={games} />
        </div>
      </div>
      <UserInfo
        show={showAccountModal}
        handleClose={handleAccountModalClose}
        name={user?.name}
        email={user?.email}
        profilePicUrl={user?.picture}
        timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
      />
      <UserBar clickHandler={onUserBarClick} name={user?.name} profilePicUrl={user?.picture} />
    </main>
  )
}

const styles = StyleSheet.create({
  topSpace: {
    height: '100%',
    marginTop: '10vmin'
  }
})
