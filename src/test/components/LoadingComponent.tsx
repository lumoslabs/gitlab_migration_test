import React from 'react'
import LoadingComponent from '@components/ui/LoadingComponent'
import { render } from '@testing-library/react'

it('matches snapshot', () => {
  const { asFragment } = render(
    <LoadingComponent />, {}
  )
  expect(asFragment()).toMatchSnapshot()
})