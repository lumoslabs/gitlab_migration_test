import React from 'react'
import ConnectAccount from '@components/ui/ConnectAccount'
import { render } from '@testing-library/react'

const handleClick = () => { window.location.href = '/' }

it('matches snapshot', () => {
  const { asFragment } = render(
    <ConnectAccount handleCancel={handleClick} handleConnect={handleClick}
   />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})