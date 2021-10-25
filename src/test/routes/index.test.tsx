import * as React from 'react'
import { render } from '@test/render-with-redux'
import { Index } from '@routes/index'

describe('routes', () => {
  describe('index page', () => {
    it('matches snapshot', () => {
      const { asFragment } = render(<Index />)
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
