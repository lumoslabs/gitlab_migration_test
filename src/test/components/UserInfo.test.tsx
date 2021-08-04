import React from 'react'
import UserInfo from '@components/ui/UserInfo'
import { render } from '@test/render-with-redux'
import ReactDOM from 'react-dom'

beforeAll(() => {
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element
  })
})

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  })
}))

// eslint-disable-next-line @typescript-eslint/no-empty-function
const handleClick = () => { }

it('matches snapshot', () => {
  const { asFragment } = render(
    <UserInfo
      show={true}
      handleClose={handleClick}
      logoutCallback={handleClick}
      email='email@example.com'
      name='Lumosity User'
      timezone='Pacific Time'
    />
  )
  expect(asFragment()).toMatchSnapshot()
})


test('UserBar displays the correct info', () => {
  const { asFragment } = render(
    <UserInfo
      show={true}
      handleClose={handleClick}
      logoutCallback={handleClick}
      email='email@example.com'
      name='Lumosity User'
      timezone='Pacific Time'
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
