import React from 'react'
import Layout from '@components/ui/Layout'
import { render } from '@testing-library/react'

it('matches snapshot', () => {
  const { asFragment } = render(
    <Layout>
      <div/>
    </Layout>, {}
  )
  expect(asFragment()).toMatchSnapshot()
})