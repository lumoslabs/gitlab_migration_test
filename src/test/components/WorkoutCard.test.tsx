import React from 'react'
import WorkoutCard from '@components/ui/WorkoutCard'
import { render } from '@testing-library/react'

const handleClick = () => { window.location.href = '/' }

it('matches snapshot', () => {
  const { asFragment } = render(
    <WorkoutCard clickHandler={handleClick} remainingGamesCount={3} totalGameCount={3} />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})
