import React from 'react'
import AgeGate from '@components/ui/AgeGate'
import { render } from '@testing-library/react'

const onSubmit = (isUnderage: boolean) => {
  window.location.href = 'https://lumos-assistant.ngrok.io/test_page',
    console.log('isUnderage: ' + isUnderage)
}
it('matches snapshot', () => {
  const { asFragment } = render(
    <AgeGate
      max={new Date(Date.UTC(2021, 7, 16, 17, 33, 0, 0))}
      onSubmit={onSubmit}
    />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})
