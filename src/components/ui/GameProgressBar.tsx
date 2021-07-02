import React from 'react';
// import ProgressBar from 'react-bootstrap/ProgressBar';
import { css, StyleSheet } from 'aphrodite/no-important';
import commonStyles from '@styles/commonStyles';
import base from '@styles/colors/base';

export interface IGameProgressBarProps {
  name: string;
  progressLevel: number;
}

const GameProgressBar = (props: IGameProgressBarProps): JSX.Element => {
  return (
    <div className={css([commonStyles.flexColumnAllCenter, commonStyles.flexJustifyCenter, styles.progressBarDiv])}>
      <div className="progress">
        <div
          className={`progress-bar ${css(styles.progressBarOverrides)}`}
          role="progressbar"
          aria-valuenow={props.progressLevel}
          style={{width:"40"}}
        />
      </div>
      <p className={css(styles.loadingText)}>
        Loading {props.name}
      </p>
    </div>
  );
}

const styles = StyleSheet.create({
  progressBarDiv: {
    position: 'absolute'
  },
  progressBarOverrides: {
    width: '64vmin',
    height: '3vmin',
    borderRadius: '1.5vmin',
    display: 'flex',
    overflow: 'hidden',
    color: base.lumosWhite,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    backgroundColor: base.lumosOrange,
    transition: 'width .6s ease'
  },
  loadingText: {
    color: 'rgb(0, 0, 0)',
    fontSize: '3vmin',
    fontFamily: 'MuseoSans500',
    marginTop: '2.5vmin'
  }
});

export default GameProgressBar;
