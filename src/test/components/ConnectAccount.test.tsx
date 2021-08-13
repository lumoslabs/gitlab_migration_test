import React from 'react'
import ConnectAccount from '@components/ui/ConnectAccount'
import { render } from '@test/render-with-redux'

const handleClick = () => { window.location.href = '/' }

it('matches snapshot', () => {
  const { asFragment } = render(
    <ConnectAccount handleCancel={handleClick} handleConnect={handleClick} />
  )
  expect(asFragment()).toMatchSnapshot()
})
