import * as React from 'react'
import { render } from '@test/render-with-redux'
import Home from '@routes/home'
import gamesMock from '@test/mocks/games'

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
}))

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home games={gamesMock} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
