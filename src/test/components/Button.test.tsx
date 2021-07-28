import React from 'react'
import Button from '@components/ui/Button'
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
    <Button
      onClick={handleClick}
      text='Button'
   />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})