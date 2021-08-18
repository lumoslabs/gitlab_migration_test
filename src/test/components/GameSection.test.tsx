import React from 'react'
import GameSection from '@components/ui/GameSection'
import { render, fireEvent } from '@testing-library/react'
import gamesMock from '@test/mocks/games'

describe('components', () => {
  describe('GameSection', () => {

    it('matches snapshot', () => {
      const { asFragment } = render(
        <GameSection games={gamesMock} onClick={(slug) => { }} />, {}
      )
      expect(asFragment()).toMatchSnapshot()
    })

    it('onClick works', () => {
      const mockOnClick = jest.fn();
      const { getByText } = render(
        <GameSection games={gamesMock} onClick={mockOnClick} />, {}
      )
      fireEvent(getByText(gamesMock[0].values.title), new MouseEvent('click', { bubbles: true }))
      expect(mockOnClick.mock.calls.length).toEqual(1)
      expect(mockOnClick.mock.calls[0][0]).toBe(gamesMock[0].values.slug)
    })

  })
})
