import { useHistory } from 'react-router-dom'
import GamePlay from '@components/GamePlay'
import { GameConfig } from '@backend/models/config'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getTraining, actions } from '@store/slices/appSlice'
import { useEffect, useState } from 'react'
import useAmplitude from '@hooks/useAmplitude'

export default function Training({ games }: { games: GameConfig[] }): JSX.Element {
  const track = useAmplitude()
  const dispatch = useAppDispatch()
  const history = useHistory()
  const training = useAppSelector(getTraining)
  const [currentGame, setCurrentGame] = useState<GameConfig>(null)
  const onFinish = () => {
    dispatch(actions.setTrainingGameCompleted(currentGame.id))
  }

  // TODO: fire event when training is completed: track('training_complete')

  useEffect(() => {
    if (!training?.games?.length) {
      // If there's no workout ready, select a random game
      const randomGameConfig = games[Math.floor(Math.random() * games.length)]
      history.push(`/game/${randomGameConfig.id}`)
      track('training_complete_random_game')
    } else {
      setCurrentGame(games.find((game) => game.id === training.games[0]))
    }
  }, [training])

return (
  <>
    {currentGame && (
      <GamePlay
        game={currentGame}
        isTraining={true}
        scoreActionButtonText={training.games.length > 0 ? 'Next Game' : 'Main Menu'}
        onFinishHandler={onFinish}
        remainingGamesCount={training?.games?.length}
        totalGameCount={training?.size}
      />
    )}
  </>
)}
