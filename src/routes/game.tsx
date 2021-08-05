import GamePlay from '@components/GamePlay'
import { GameConfig } from '@backend/models/config'
import useAmplitude from '@hooks/useAmplitude'
import { useEffect } from 'react'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'

export default function Game({ game }: { game: GameConfig }): JSX.Element {
  const track = useAmplitude()
  const { sendTextQuery } = useInteractiveCanvas()

  useEffect(() => {
    track('page_view')
  }, [])

  return (
    <GamePlay
      scoreActionButtonText={'Main Menu'}
      game={game}
      isTraining={false}
      onFinishHandler={() => {
        sendTextQuery('Home')
      }}
    />
  )
}
