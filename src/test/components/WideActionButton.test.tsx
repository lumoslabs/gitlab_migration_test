import React from 'react'
import { StyleSheet } from 'aphrodite'
import WideActionButton from '@components/ui/WideActionButton'
import { render } from '@test/render-with-redux'

let currentPage = window.location.href
const handleClick = () => { currentPage = '/' }
const styles = StyleSheet.create({
  nextButton: {
    height: '8.75vmin',
    width: '31.75vmin',
    fontFamily: 'MuseoSans700',
    fontSize: '3.625vmin',
    fontWeight: 700,
    margin: '3.33vh',
    padding: 0
  }
})

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
    <WideActionButton
      extendStyles={styles.nextButton}
      buttonText='WideActionButton'
      onClick={handleClick}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
