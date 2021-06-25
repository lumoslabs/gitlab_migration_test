import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { analyticsTrack } from '../segment/analytics';
import { base, gray2 } from '../styles/colors';
import commonStyles from '../styles/commonStyles';
import blueCheckMark from '../assets/blue_checkmark.png';

const WideCheckBox = (props) => {

  return (
    <div
      className={css([commonStyles.flexRowAllCenter, styles.checkBoxdiv])}
      onClick={
        (e) => {
          analyticsTrack('card_click', {
            id: props.id,
            current_page: props.currentPage,
            message: props.text,
            type: props.selected ? 'unchecked' : 'checked', // intentionally opposite as the toggle happens after
          });
          props.onClick();
          e.preventDefault();
        }
      }
    >
      <div className={css([commonStyles.flexJustifyCenter, styles.checkBox])}>
        {props.selected &&
          <img
            src={blueCheckMark}
            className={css(styles.checkImage)}
          />
        }
      </div>
      <div className={css([commonStyles.flexJustifyCenter, styles.textdiv])}>
        <p className={css(commonStyles.wideText)}>
          {props.text}
        </p>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  checkBoxdiv: {
    backgroundColor: gray2,
    width: 640,
    height: 64,
    marginTop: 20,
    cursor: 'pointer'
  },
  textdiv: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    userSelect: 'none'
  },
  checkImage: {
    height: 22,
    width: 24
  },
  checkBox: {
    backgroundColor: base.lumosWhite,
    width: 32,
    height: 32,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    ':focus': {
      outline: 'none'
    },
    ':hover': {
      backgroundColor: '#eee',
      color: base.lumosBlack
    },
    ':active': {
      backgroundColor: '#d5d5d5'
    }
  },
  wideText: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans500',
    fontSize: '1.75vw',
    fontWeight: 600,
    userSelect: 'none'
  }
});

export default WideCheckBox;
