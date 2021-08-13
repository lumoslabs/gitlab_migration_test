import React from 'react'
import Button from '@components/ui/Button'
import { render } from '@test/render-with-redux'

const handleClick = () => { window.location.href = '/' }

it('matches snapshot', () => {
  const { asFragment } = render(
    <Button
      onClick={handleClick}
      text='Button'
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
