import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GamePlay from '@components/GamePlay'
import { GameConfig } from '@backend/services/ConfigService'
import useAmplitude from '@hooks/useAmplitude'
import ErrorScreen from '@components/ui/ErrorScreen'
import { useAppSelector } from '@store/hooks'
import { selectScoresGetError } from '@store/slices/scores'
import useNavigation from '@hooks/useNavigation'

export default function Game({ games }: { games: GameConfig[] }): JSX.Element {
  const track = useAmplitude()
  const { slug } = useParams<{ slug: string }>();
  const game = games.find((game) => {
    return game.id === slug
  })

  const navigation = useNavigation()
  const error = useAppSelector(selectScoresGetError)

  const finishHandler = () => {
    navigation.toHome()
  }

  useEffect(() => {
    track('page_view')
  }, [])



  if (error) {
    return <>
      <ErrorScreen text={error} onClick={finishHandler} />
    </>
  }


  if (!game) {
    return <></>
  }

  return (
    <GamePlay
      scoreActionButtonText={'Main Menu'}
      game={game}
      isTraining={false}
      onFinishHandler={finishHandler}
    />
  )
}
