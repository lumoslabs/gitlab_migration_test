import React from 'react'
import WorkoutCard from '@components/ui/WorkoutCard'
import { render } from '@testing-library/react'

const handleClick = () => { window.location.href = '/' }

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
}))

it('matches snapshot', () => {
  const { asFragment } = render(
    <WorkoutCard clickHandler={handleClick} remainingGamesCount={3} totalGameCount={3} />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})
