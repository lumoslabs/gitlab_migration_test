import React from 'react'
import Button from '@components/ui/Button'
import { fireEvent, render } from '@test/render-with-redux'

const mockTrack = jest.fn()
jest.mock('@hooks/useAmplitude', () => {
  return jest.fn(() => mockTrack)
})

describe('components', () => {
  describe('Button', () => {

    it('matches snapshot', () => {
      const mockOnClick = jest.fn();
      const { asFragment } = render(
        <Button
          onClick={mockOnClick}
          text='Button'
        />
      )
      expect(asFragment()).toMatchSnapshot()
    })

    it('onClick works', () => {
      const mockOnClick = jest.fn();
      const { getByText } = render(
        <Button
          onClick={mockOnClick}
          text='Button'
        />
      )
      fireEvent(getByText('Button'), new MouseEvent('click', { bubbles: true }))
      expect(mockOnClick.mock.calls.length).toEqual(1)
    })

    it('onClick tracks event', () => {
      const mockOnClick = jest.fn();

      mockTrack.mockClear()
      const eventData = { test: 'mock' }
      const { getByText } = render(
        <Button
          onClick={mockOnClick}
          text='Button'
          eventData={eventData}
        />
      )
      fireEvent(getByText('Button'), new MouseEvent('click', { bubbles: true }))
      expect(mockTrack.mock.calls.length).toEqual(1)
      expect(mockTrack.mock.calls[0][0]).toBe("button_click")
      expect(mockTrack.mock.calls[0][1]).toStrictEqual({ ...eventData, message: 'Button' })
    })
  })
})
