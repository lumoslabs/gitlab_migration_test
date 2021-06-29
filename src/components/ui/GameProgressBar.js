
import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { css, StyleSheet } from 'aphrodite/no-important';
import commonStyles from '../../styles/commonStyles';
import { commonNestStylesWithProps } from '../../styles/commonNestStyles';

import './cocos.css';

function GameProgressBar(props) {
  return (
    <div className = { css([commonStyles.flexColumnAllCenter, commonStyles.flexJustifyCenter,
      commonNestStylesWithProps({ clientHeight: window.usableClientHeight}).fullHeight,
      styles.progressBarDiv
    ])}>
      <ProgressBar className = { css([styles.progressOverride]) } animated={ false } now={props.progressLevel} />
      <p className = { css(styles.loadingText) }>
        Loading { props.name }
      </p>
    </div>
  );
}

const styles = StyleSheet.create({
  progressBarDiv: {
    position: 'absolute',
  },
  progressOverride: {
    width: '64vmin',
    height: '3vmin',
    borderRadius: '1.5vmin',
  },
  loadingText: {
    color: 'rgb(0, 0, 0)',
    fontSize: '3vmin',
    fontFamily: 'MuseoSans500',
    marginTop: '2.5vmin',
  }
});

export default GameProgressBar;
