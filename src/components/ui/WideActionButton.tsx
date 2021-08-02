import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import Button from '@components/ui/Button'
import commonStyles from '@styles/commonStyles'
import amplitudeEvent from '@hooks/amplitudeEvent'

export interface IWideActionButtonProps {
  extendStyles?: any;
  buttonText: string;
  onClick?(e: React.MouseEvent<any>): any;
  eventData?: Record<string, any>
  disabled?: boolean;
}

const WideActionButton = ({ buttonText, onClick, extendStyles, eventData, disabled }: IWideActionButtonProps): JSX.Element => {
  const track = amplitudeEvent()

  return (
    <div className={css(commonStyles.flexJustifyCenter)}>
      <Button
        disabled={disabled}
        buttonStyles={[styles.wideAction, extendStyles]}
        text={buttonText}
        onClick={e => {
          track('button_click', eventData)
          onClick(e)
          e.preventDefault()
        }}
      />
    </div>
  )
}

const styles = StyleSheet.create({
  wideAction: {
    width: 327,
    height: 56
  }
})

export default WideActionButton
