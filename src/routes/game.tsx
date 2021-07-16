import { useState } from 'react'
import { GameConfig } from '@backend/models/config'
import GameContainer from '@components/ui/GameContainer'
import GameScoreCard from '@components/ui/GameScoreCard'
import { useHistory } from 'react-router-dom'

export default function Game({ game }: { game: GameConfig }): JSX.Element {
  const [result, setResult] = useState(null)
  const onComplete = (data: any) => {
    setResult(data)
  }
  const history = useHistory()
  // TODO: make this bring you to next game during a workout
  const actionButtonHandler = () => { history.push('/home') }

  // TODO: handle data for these
  const showTrainingIcon = true
  const trainingIcon = '/assets/workout_icon.svg'
  const showTrophy = true
  const topScoreTodaysScoreIndex = 0
  const topScoresData = [{ "updated_at": "05/02/2020", "score": 600000 }, { "updated_at": "2021-07-02T20:15:27Z", "score": 55000 }, { "updated_at": "07/01/2020", "score": 5000 }, { "updated_at": "07/01/2020", "score": 4000 }, { "updated_at": "07/01/2020", "score": 3000 }]
  const actionButtonText = 'Main Menu'

  // Data from Game Config
  const title = game.values.title
  const gameIcon = game.values.score_thumbnail_url
  // shall we simplify this data structure in the database?
  const statLabel = game.values.frontend_data.scores[0].score_screen_score_key.replace('scoreScreen', '')

  // Data from game result
  const currentScore = result?.score
  const stat = result?.stat

  return (
    <main>
      {(!result) && (
        <GameContainer
          game={game}
          onComplete={onComplete}
        />
      )}
      {result && (
        <GameScoreCard
          title={title}
          gameIcon={gameIcon}
          showTrainingIcon={showTrainingIcon}
          showTrophy={showTrophy}
          trainingIcon={trainingIcon}
          currentScore={currentScore}
          topScoreTodaysScoreIndex={topScoreTodaysScoreIndex}
          topScoresData={topScoresData}
          actionButtonText={actionButtonText}
          actionButtonHandler={actionButtonHandler}
          stat={stat}
          statLabel={statLabel}
        />
      )}
    </main>
  )
}
