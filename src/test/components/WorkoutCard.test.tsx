import React from 'react'
import WorkoutCard from '@components/ui/WorkoutCard'
import { render } from '@test/render-with-redux'

describe('components', () => {
  describe('WorkoutCard', () => {
    it('matches snapshot', () => {
      const mockOnClick = jest.fn();
      const { asFragment } = render(
        <WorkoutCard clickHandler={mockOnClick} remainingGamesCount={3} totalGameCount={3} />
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
