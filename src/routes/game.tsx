import GamePlay from '@components/GamePlay'
import { GameConfig } from '@backend/services/ConfigService'
import useAmplitude from '@hooks/useAmplitude'
import { useEffect } from 'react'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'
import { useHistory } from 'react-router-dom'

export default function Game({ game }: { game: GameConfig }): JSX.Element {
  const track = useAmplitude()
  const { sendTextQuery } = useInteractiveCanvas()
  const router = useHistory()

  useEffect(() => {
    track('page_view')
  }, [])

  return (
    <GamePlay
      scoreActionButtonText={'Main Menu'}
      game={game}
      isTraining={false}
      onFinishHandler={() => {
        sendTextQuery('Home').then((result) => {
          if (result === 'BLOCKED') {
            router.push('/home')
          }
        })
      }}
    />
  )
}
