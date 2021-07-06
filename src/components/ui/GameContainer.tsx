import React from 'react';
import Card from 'react-bootstrap/Card';
// import Script from 'react-load-script';
// import { Link } from 'react-router-dom';
import commonStyles from '@styles/commonStyles';
import { css, StyleSheet } from 'aphrodite/no-important';
import GameProgressBar from '@components/ui/GameProgressBar';

const GameContainer = (): JSX.Element => {

  // TODO: get these variables from gameRun
  const showProgress = true;
  const progressLevel = 50;

  return (
    <div className={css([commonStyles.fullWidth, commonStyles.flexColumnAllCenter])}>
      <Card className={css([commonStyles.flexColumnAllCenter, styles.gameFrame])}>
        <Card.Body className={css(commonStyles.flexJustifyCenter)}>
          <canvas
            id="gameCanvas"
            className={css(commonStyles.flexColumnAllCenter)}
          >
          </canvas>
          {
            showProgress &&
            <GameProgressBar progressLevel={progressLevel} />
          }
          {/* TODO: Hookup game */}
          {/* <Script attributes={{ id:'gameScript', ref:'gameScript'}} url={gameUrl} /> */}
        </Card.Body>
      </Card>
      {/* { TODO: Set up skip game
        config.development && isTester(userStoreState) &&
        <div className={css([commonStyles.flexRowAllCenter, styles.skipTextdiv])}>
          <Link to=''
            onClick={ () => {
              setEndContinuousMatch(true);
              props.skipGame(gameRunId);
            }}
            replace
          >
            Skip
          </Link>
        </div>
      } */}
    </div>
  );
}

const styles = StyleSheet.create({
  gameFrame: {
    height: '100%',
    background: 'transparent',
    border: '0px'
  },
  homediv: {
    paddingBottom: 20,
  },
  skipTextdiv: {
    position: 'absolute',
    left: '20px',
    bottom: '20px',
    zIndex: 1,
    margin: 0,
    padding: 0
  }
});


export default GameContainer;
