import React from 'react'
import GameCard from '@components/ui/GameCard'
import { render } from '@testing-library/react'

it('matches snapshot', () => {
  const { asFragment } = render(
    <GameCard
      brainArea='Attention'
      bannerUrl='https://assets-staging.nest.lumosity.com/frontend_assets/thumbnails/medium_thumbnail_color_match.png'
      title='Color Match'
      slug='color-match-nest'
   />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})