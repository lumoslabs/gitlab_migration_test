import GamePlay from '@components/GamePlay'
import { GameConfig } from '@backend/services/ConfigService'
import useAmplitude from '@hooks/useAmplitude'
import { useEffect } from 'react'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'
import { useHistory } from 'react-router-dom'
import sample from 'lodash.sample'

export default function Game({ slug, games }: { games: GameConfig[], slug: string }): JSX.Element {
  const track = useAmplitude()
  const { sendTextQuery } = useInteractiveCanvas()
  const history = useHistory()
  const game = games.find((game) => game.id === slug)

  useEffect(() => {
    track('page_view')
  }, [])

  return (
    <GamePlay
      scoreActionButtonText={'Main Menu'}
      game={game}
      isTraining={false}
      onNextHandler={() => {
        history.push('/game/' + sample(games).id)
      }}
      onFinishHandler={() => {
        sendTextQuery('Home').then((result) => {
          //TODO: fix it with the new interactiveCanvas
          if (result === 'BLOCKED') {
            history.push('/home')
          }
        })
      }}
    />
  )
}
