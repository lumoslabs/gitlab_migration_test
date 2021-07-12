import React from 'react'
import renderer from 'react-test-renderer'
import UserBar from '@components/ui/UserBar'
import { render } from '@testing-library/react'

const handleClick = () => { window.location.href = '/' }

test('UserBar displays the correct info', () => {
  const component = renderer.create(
    <UserBar
      clickHandler={handleClick}
    />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('matches snapshot', () => {
  const { asFragment } = render(
    <UserBar
      clickHandler={handleClick}
   />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})