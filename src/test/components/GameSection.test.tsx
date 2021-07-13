import React from 'react'
import GameSection from '@components/ui/GameSection'
import { render } from '@testing-library/react'

it('matches snapshot', () => {
  const { asFragment } = render(
    <GameSection />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})