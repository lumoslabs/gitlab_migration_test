import { useHistory } from 'react-router-dom'

import GamePlay from '@components/GamePlay'
import { GameConfig } from '@backend/models/config'

export default function Game({ game }: { game: GameConfig }): JSX.Element {
  const history = useHistory()
  return (
    <GamePlay game={game} isTraining={false} onFinishHandler={() => {
      history.push('/home')
    }} />
  )
}
