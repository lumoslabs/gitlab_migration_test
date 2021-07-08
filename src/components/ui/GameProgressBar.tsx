import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { css, StyleSheet } from 'aphrodite/no-important'
import commonStyles from '@styles/commonStyles'
import base from '@styles/colors/base'

export interface IGameProgressBarProps {
  progressLevel: number;
}

const GameProgressBar = (props: IGameProgressBarProps): JSX.Element => {
  return (
    <div className={css([commonStyles.flexColumnAllCenter, commonStyles.flexJustifyCenter, styles.progressBarDiv])}>
      <ProgressBar variant='lumos' className={css(styles.progressOverride)} animated={false} now={props.progressLevel} />
      <p className={css(styles.loadingText)}>
        Loading
      </p>
    </div>
  )
}

const styles = StyleSheet.create({
  progressBarDiv: {
    position: 'absolute',
    height: '80vmin'
  },
  progressOverride: {
    width: '64vmin',
    height: '3vmin',
    borderRadius: '1.5vmin',
    backgroundColor: base.lumosWhite,
    transition: 'width .6s ease'
  },
  loadingText: {
    color: base.lumosBlack,
    fontSize: '3vmin',
    fontFamily: 'MuseoSans500',
    marginTop: '2.5vmin'
  }
})

export default GameProgressBar
