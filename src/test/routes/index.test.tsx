import * as React from 'react'
import { render } from '@test/render-with-redux'
import { Index } from '@routes/index'

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

describe('Index page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Index />)
    expect(asFragment()).toMatchSnapshot()
  })
})
