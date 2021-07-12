import React from 'react'
import Button from '@components/ui/Button'
import { render } from '@testing-library/react'

const handleClick = () => { window.location.href = '/' }

it('matches snapshot', () => {
  const { asFragment } = render(
    <Button
      onClick={handleClick}
      text='Button'
   />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})