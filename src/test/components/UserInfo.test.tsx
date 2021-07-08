import React from 'react'
import UserInfo from '@components/ui/UserInfo'
import { render } from '@testing-library/react'

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