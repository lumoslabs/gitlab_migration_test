import React from 'react'
import AgeGate from '@components/ui/AgeGate'
import { render } from '@test/render-with-redux'

const onSubmit = (isUnderage: boolean) => {
  window.location.href = 'https://lumos-assistant.ngrok.io/test_page',
    console.log('isUnderage: ' + isUnderage)
}

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
    <AgeGate
      max={new Date(Date.UTC(2021, 7, 16, 17, 33, 0, 0))}
      min={new Date(Date.UTC(1900, 7, 16, 17, 33, 0, 0))}
      onSubmit={onSubmit}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
