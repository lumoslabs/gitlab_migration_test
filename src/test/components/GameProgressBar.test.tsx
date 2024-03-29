import React from 'react'
import GameProgressBar from '@components/ui/GameProgressBar'
import { render } from '@testing-library/react'

describe('components', () => {
  describe('GameProgressBar', () => {
    it('matches snapshot', () => {
      const { asFragment } = render(
        <GameProgressBar
          progressLevel={50}
        />, {}
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
