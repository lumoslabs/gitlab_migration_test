import * as React from 'react'
import { render } from '@test/render-with-redux'
import Home from '@routes/home'
import gamesMock from '@test/mocks/games'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home games={gamesMock} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
