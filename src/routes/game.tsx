import { useHistory } from 'react-router-dom'
import GamePlay from '@components/GamePlay'
import { GameConfig } from '@backend/models/config'
import amplitudeEvent from '@hooks/amplitudeEvent'
import { useEffect } from 'react'

export default function Game({ game }: { game: GameConfig }): JSX.Element {
  const history = useHistory()
  const track = amplitudeEvent()

  useEffect(() => {
    track('page_view')
  }, [])

  return (
    <GamePlay
      scoreActionButtonText={'Main Menu'}
      game={game}
      isTraining={false}
      onFinishHandler={() => { history.push('/home')}}
    />
  )
}
