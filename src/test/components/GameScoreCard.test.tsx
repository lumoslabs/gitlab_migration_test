import React from 'react'
import GameScoreCard from '@components/ui/GameScoreCard'
import { render } from '@test/render-with-redux'

const handleClick = () => { window.location.href = '/' }

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
}))

it('matches snapshot', () => {
  const { asFragment } = render(
    <GameScoreCard
      title='Color Match'
      gameIcon='https://assets-staging.nest.lumosity.com/frontend_assets/thumbnails/medium_thumbnail_color_match.png'
      showTrainingIcon={true}
      currentScore={600000}
      topScoresData={[{ "date": "05/02/2020", "score": 600000 }, { "date": "2021-07-02T20:15:27Z", "score": 55000 }, { "date": "07/01/2020", "score": 5000 }, { "date": "07/01/2020", "score": 4000 }, { "date": "07/01/2020", "score": 3000 }]}
      actionButtonText='Next Game'
      actionButtonHandler={handleClick}
      stat={10}
      statLabel='Cards'
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
