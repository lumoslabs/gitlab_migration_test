import * as React from 'react'
import { render } from '@test/render-with-redux'
import Home from '@routes/home'
import gamesMock from '@test/mocks/games'

describe('routes', () => {
  describe('home', () => {
    it('matches snapshot', () => {
      const { asFragment } = render(<Home games={gamesMock} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
