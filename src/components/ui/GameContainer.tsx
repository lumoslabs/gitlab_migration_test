import React from 'react'
import Card from 'react-bootstrap/Card'
import Script from 'react-load-script'
import { GameConfig } from '@backend/models/config'
// import { Link } from 'react-router-dom'
import commonStyles from '@styles/commonStyles'
import { css, StyleSheet } from 'aphrodite/no-important'
import GameProgressBar from '@components/ui/GameProgressBar'

export interface IGameContainerProps {
  progressLevel?: number;
  showProgress?: boolean;
  game: GameConfig;

}

const GameContainer = (props: IGameContainerProps): JSX.Element => {

  const { progressLevel, showProgress, game } = props
  const gameUrl = game.last_version.overrides.game_url
  const versionedGameUrl = `${gameUrl}game.js?ts=${Date.now()}`
  const gameVars = game.last_version.overrides.extras

  const Lumos = {
    gamevars: {
      ...gameVars,
      game_resources_url: gameUrl,
    },
  }
// TODO implement this
  // window.sendToJavaScript = (data) => {
  //   parseEventData(data)
  // }
  // copy https://github.com/lumoslabs/lumos_next/blob/4953ecc0a76ab7a9dc8e2e319a887c286e32120e/hooks/useGame.ts ?

  window.Lumos = Lumos

  return (
    <div className={css([commonStyles.fullWidth, commonStyles.flexColumnAllCenter])}>
      <Card className={css([commonStyles.flexColumnAllCenter, styles.gameFrame])}>
        <Card.Body className={css(commonStyles.flexJustifyCenter)}>
          <div className='cocos3' id='game-manager'>
            <canvas
              id="gameCanvas"
              className={css([commonStyles.flexColumnAllCenter, styles.gameCanvas])}
              style={{visibility: showProgress ? 'hidden' : 'visible' }}
              >
            </canvas>
          </div>
          {
            showProgress &&
            <GameProgressBar progressLevel={progressLevel} />
          }
          <Script attributes={{ id:'gameScript', ref:'gameScript'}} url={versionedGameUrl} />
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
  )
}

const styles = StyleSheet.create({
  gameFrame: {
    height: '100%',
    background: 'transparent',
    border: '0px'
  },
  gameCanvas: {
    width: '480px',
    height: '640px'
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
})


export default GameContainer
