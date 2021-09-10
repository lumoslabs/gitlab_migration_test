import React from 'react'
import UserBar from '@components/ui/UserBar'
import { render } from '@testing-library/react'

describe('components', () => {
  describe('UserBar', () => {
    it('matches snapshot', () => {
      const mockOnClick = jest.fn();
      const { asFragment } = render(
        <UserBar
          clickHandler={mockOnClick}
        />, {}
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
