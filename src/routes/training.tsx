import { useHistory } from 'react-router-dom'
import GamePlay from '@components/GamePlay'
import { GameConfig } from '@backend/models/config'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getTraining, actions } from '@store/slices/appSlice'
// import { getRandomElement } from '@backend/conversation/utils'
import { useEffect, useState } from 'react'

export default function Training({ games }: { games: GameConfig[] }): JSX.Element {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const training = useAppSelector(getTraining)
  const [currentGame, setCurrentGame] = useState<GameConfig>(null)
  const onFinish = () => {
    dispatch(actions.setTrainingGameCompleted(currentGame.id))
  }

  useEffect(() => {
    if (!training?.games?.length) {
      // If there's no workout ready, select a random game
      const randomGameConfig = games[Math.floor(Math.random() * games.length)]
      history.push(`/game/${randomGameConfig.id}`)
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
        scoreActionButtonText={training.games.length ? 'Next Game' : 'Main Menu'}
        onFinishHandler={onFinish}
      />
    )}
  </>
)}
