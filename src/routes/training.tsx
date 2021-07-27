import { useHistory } from 'react-router-dom'

import GamePlay from '@components/GamePlay'
import { GameConfig } from '@backend/models/config'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getTraining, actions } from '@store/slices/appSlice'
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
    if (!training.games.length) {
      history.push('/home')
    } else {
      setCurrentGame(games.find((game) => game.id === training.games[0]))
    }
  }, [training])
  return <>
    {currentGame && <GamePlay game={currentGame} isTraining={true} scoreActionButtonText={training.games.length ? 'Next Game' : 'Main Menu'} onFinishHandler={onFinish} />}
  </>
}
