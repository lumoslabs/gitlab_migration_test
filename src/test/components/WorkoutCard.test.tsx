import React from 'react'
import WorkoutCard from '@components/ui/WorkoutCard'
import { render } from '@testing-library/react'

const handleClick = () => { window.location.href = '/' }

it('matches snapshot', () => {
  const { asFragment } = render(
    <WorkoutCard clickHandler={handleClick}/>, {}
  )
  expect(asFragment()).toMatchSnapshot()
})