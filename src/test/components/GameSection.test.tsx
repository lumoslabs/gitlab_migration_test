import React from 'react'
import GameSection from '@components/ui/GameSection'
import { render } from '@testing-library/react'
import gamesMock from '@test/mocks/games'

it('matches snapshot', () => {
  const { asFragment } = render(
    <GameSection games={gamesMock} onClick={(slug) => { }} />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})

//TODO: test onclick function
