import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import Button from '@components/ui/Button'
import commonStyles from '@styles/commonStyles'
import useAmplitude from '@hooks/useAmplitude'

export interface IWideActionButtonProps {
  extendStyles?: any;
  buttonText: string;
  onClick?(e: React.MouseEvent<any>): any;
  eventData?: Record<string, any>
}

const WideActionButton = (props: IWideActionButtonProps): JSX.Element => {
  const extendStyles = props.extendStyles || []
  const track = useAmplitude()

  return (
    <div className={css(commonStyles.flexJustifyCenter)}>
      <Button
        buttonStyles={[styles.wideAction, extendStyles]}
        text={props.buttonText}
        onClick={e => {
          track('button_click', props.eventData)
          props.onClick(e)
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
