import React from 'react'
import UserBar from '@components/ui/UserBar'
import { render } from '@testing-library/react'

const handleClick = () => { window.location.href = '/' }

it('matches snapshot', () => {
  const { asFragment } = render(
    <UserBar
      clickHandler={handleClick}
   />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})