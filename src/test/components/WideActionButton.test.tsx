import React from 'react'
import { StyleSheet } from 'aphrodite'
import WideActionButton from '@components/ui/WideActionButton'
import { render } from '@test/render-with-redux'


describe('components', () => {
  describe('WideActionButton', () => {
    const mockOnClick = jest.fn();
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
    it('matches snapshot', () => {
      const { asFragment } = render(
        <WideActionButton
          extendStyles={styles.nextButton}
          buttonText='WideActionButton'
          onClick={mockOnClick}
        />
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
