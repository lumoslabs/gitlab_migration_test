import React from 'react'
import UserInfo from '@components/ui/UserInfo'
import { render } from '@testing-library/react'
// import renderer from 'react-test-renderer'

const handleClick = () => { window.location.href = '/' }

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


// test('UserBar displays the correct info', () => {
//   const component = renderer.create(
//     <UserInfo
//       show={true}
//       handleClose={handleClick}
//       logoutCallback={handleClick}
//       email='email@example.com'
//       name='Lumosity User'
//       timezone='Pacific Time'
//     />, {}
//   )

//   let tree = component.toJSON()
//   expect(tree).toMatchSnapshot()

//   tree = component.toJSON()
//   expect(tree).toMatchSnapshot()
// })