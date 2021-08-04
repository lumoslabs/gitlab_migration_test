import { useHistory } from 'react-router-dom'
import GamePlay from '@components/GamePlay'
import { GameConfig } from '@backend/models/config'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getTraining, actions } from '@store/slices/appSlice'
import { useEffect, useState } from 'react'
import useAmplitude from '@hooks/useAmplitude'
import sample from 'lodash.sample'

export default function Training({ games }: { games: GameConfig[] }): JSX.Element {
  const track = useAmplitude()
  const dispatch = useAppDispatch()
  const history = useHistory()
  const training = useAppSelector(getTraining)
  const [currentGame, setCurrentGame] = useState<GameConfig>(null)
  const onFinish = () => {
    dispatch(actions.setTrainingGameCompleted(currentGame.id))
  }

  const onGameComplete = () => {
    if (training?.games?.length === 1) {
      track('training_session_finish')
    }
  }

  useEffect(() => {
    if (!training?.games?.length) {
      history.push(`/home`)
    } else {
      setCurrentGame(games.find((game) => game.id === training.games[0]))
    }
  }, [training])


  //Should be the last useEffect here
  useEffect(() => {
    if (!training?.games?.length) {
      // If there's no workout ready, select a random game
      const randomGameConfig = sample(games)
      history.push(`/game/${randomGameConfig.id}`)
    }
  }, [])

  return (
    <>
      {currentGame && (
        <GamePlay
          game={currentGame}
          isTraining={true}
          onGameComplete={onGameComplete}
          scoreActionButtonText={training.games.length > 1 ? 'Next Game' : 'Main Menu'}
          onFinishHandler={onFinish}
          remainingGamesCount={training?.games?.length}
          totalGameCount={training?.size}
        />
      )}
    </>
  )
}
