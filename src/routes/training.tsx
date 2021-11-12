import { useHistory } from 'react-router-dom'
import GamePlay from '@components/GamePlay'
import { GameConfig } from '@backend/services/ConfigService'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getTraining, actions } from '@store/slices/appSlice'
import { useEffect, useState } from 'react'
import useAmplitude from '@hooks/useAmplitude'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'
import sample from 'lodash.sample'

export default function Training({ games }: { games: GameConfig[] }): JSX.Element {
  const { sendTextQuery } = useInteractiveCanvas()
  const track = useAmplitude()
  const dispatch = useAppDispatch()
  const history = useHistory()
  const training = useAppSelector(getTraining)
  const [currentGame, setCurrentGame] = useState<GameConfig>(null)
  const [nextGame, setNextGame] = useState<GameConfig>(null)

  const onFinish = () => {
    if (nextGame) {
      setCurrentGame(nextGame)
    } else {
      sendTextQuery('Home').then((result) => {
        //TODO: fix it with the new interactiveCanvas
        if (result === 'BLOCKED') {
          history.push('/home')
        }
      })
    }
  }

  const onNextHandler = () => {
    if (nextGame) {
      setCurrentGame(nextGame)
    } else {
      const randomGame = sample(games)
      history.push('/game/' + randomGame.id)
    }
  }

  const onGameComplete = () => {
    if (training?.games?.length === 1) {
      track('training_session_finish')
    }
    dispatch(actions.setTrainingGameCompleted(currentGame.id))
  }

  useEffect(() => {
    if (!training?.games?.length) {
      setNextGame(null)
    } else {
      setNextGame(games.find((game) => game.id === training.games[0]))
    }
  }, [training])


  //Should be the last useEffect here
  useEffect(() => {
    if (!training?.games?.length) {
      // If there's no workout ready, select a random game
      const randomGameConfig = sample(games)
      history.push(`/game/${randomGameConfig.id}`)
    } else {
      setCurrentGame(games.find((game) => game.id === training.games[0]))
    }
  }, [])

  return (
    <>
      {currentGame && (
        <GamePlay
          game={currentGame}
          isTraining={true}
          onGameComplete={onGameComplete}
          scoreActionButtonText={training.games.length > 0 ? 'Next Game' : 'Main Menu'}
          onFinishHandler={onFinish}
          onNextHandler={onNextHandler}
          remainingGamesCount={training?.games?.length}
          totalGameCount={training?.size}
        />
      )}
    </>
  )
}
