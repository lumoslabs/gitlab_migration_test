import React from 'react'
import AgeGate from '@components/ui/AgeGate'
import { render } from '@test/render-with-redux'

const onSubmit = () => { window.location.href = '/' }

describe('components', () => {
  describe('AgeGate', () => {
    it('matches snapshot', () => {
      const { asFragment } = render(
        <AgeGate
          max={new Date(Date.UTC(2021, 1, 1, 1, 1, 0, 0))}
          min={new Date(Date.UTC(1900, 1, 1, 1, 1, 0, 0))}
          onSubmit={onSubmit}
        />
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
