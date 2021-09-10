import React from 'react'
import GameCard from '@components/ui/GameCard'
import { render } from '@testing-library/react'

describe('components', () => {
  describe('GameCard', () => {
    it('matches snapshot', () => {
      const { asFragment } = render(
        <GameCard
          brainArea='Attention'
          bannerUrl='https://assets-staging.nest.lumosity.com/frontend_assets/thumbnails/medium_thumbnail_color_match.png'
          title='Color Match'
          slug='color-match-nest'
          onClick={() => { }}
        />, {}
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
