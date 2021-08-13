import React from 'react'
import UserInfo from '@components/ui/UserInfo'
import { render } from '@test/render-with-redux'
import ReactDOM from 'react-dom'

beforeAll(() => {
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element
  })
})

// eslint-disable-next-line @typescript-eslint/no-empty-function
const handleClick = () => { }

it('matches snapshot', () => {
  const { asFragment } = render(
    <UserInfo
      show={true}
      handleClose={handleClick}
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
      email='email@example.com'
      name='Lumosity User'
      timezone='Pacific Time'
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
