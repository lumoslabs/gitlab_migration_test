import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { RoundedButton } from './buttons';
import { analyticsTrack } from '../segment/analytics';
import commonStyles from '../styles/commonStyles';

const WideActionButton = (props) => {
  const extendStyles = props.extendStyles || []

  return (
    <div className={ css(commonStyles.flexJustifyCenter) }>
      <RoundedButton
        styles = { [commonStyles.action, styles.wideAction, ...extendStyles] }
        value = { props.buttonText }
        onClick = {e => {
          analyticsTrack('button_click', {
            id: props.id,
            current_page: props.currentPage,
            message: props.buttonText,
          });
          props.onClick(e);
          e.preventDefault();
        }}
        disabled = { props.disabled }
      />
    </div>
  );
};

const styles = StyleSheet.create({
  wideAction: {
    width: 327,
    height: 56
  },
});

export default WideActionButton;
