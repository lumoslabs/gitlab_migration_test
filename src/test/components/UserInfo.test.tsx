import React from 'react'
import UserInfo from '@components/ui/UserInfo'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'

beforeAll(() => {
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element
  })
});

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
    />, {}
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
    />, {}
  )
  expect(asFragment()).toMatchSnapshot()
  /*
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    */
})
