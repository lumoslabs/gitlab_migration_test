import React from 'react'
import LoadingComponent from '@components/ui/LoadingComponent'
import { render } from '@testing-library/react'

describe('components', () => {
  describe('LoadingComponent', () => {
    it('matches snapshot', () => {
      const { asFragment } = render(
        <LoadingComponent />, {}
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
