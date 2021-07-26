import React from 'react'
import GameScoreCard from '@components/ui/GameScoreCard'
import { render } from '@testing-library/react'

const handleClick = () => { window.location.href = '/' }

it('matches snapshot', () => {
  const { asFragment } = render(
    <GameScoreCard
      title='Color Match'
      gameIcon='https://assets-staging.nest.lumosity.com/frontend_assets/thumbnails/medium_thumbnail_color_match.png'
      showTrainingIcon={true}
      trainingIcon='/assets/training_1by3.svg'
      currentScore={600000}
      topScoresData={[{ "date": "05/02/2020", "score": 600000 }, { "date": "2021-07-02T20:15:27Z", "score": 55000 }, { "date": "07/01/2020", "score": 5000 }, { "date": "07/01/2020", "score": 4000 }, { "date": "07/01/2020", "score": 3000 }]}
      actionButtonText='Next Game'
      actionButtonHandler={handleClick}
      stat={10}
      statLabel='Cards'
    />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})
