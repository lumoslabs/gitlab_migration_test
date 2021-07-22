import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import Button from '@components/ui/Button'

import commonStyles from '../../styles/commonStyles'
// TODO:
// import { analyticsTrack } from '../segment/analytics';

export interface IWideActionButtonProps {
  extendStyles: any;
  buttonText: string;
  onClick?(e: React.MouseEvent<any>): any;
  id?: string;
}

const WideActionButton = (props: IWideActionButtonProps): JSX.Element => {
  const extendStyles = props.extendStyles || []

  return (
    <div className={css(commonStyles.flexJustifyCenter)}>
      <Button
        buttonStyles={[styles.wideAction, extendStyles]}
        text={props.buttonText}
        onClick={e => {
          // TODO:
          // analyticsTrack('button_click', {
          //   id: props.id,
          //   current_page: props.currentPage,
          //   message: props.buttonText,
          // });
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
  },
})

export default WideActionButton
