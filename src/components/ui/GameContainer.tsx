import React from 'react'
import Card from 'react-bootstrap/Card'
import Script from 'react-load-script'
import { GameConfig } from '@backend/models/config'
import commonStyles from '@styles/commonStyles'
import { css, StyleSheet } from 'aphrodite/no-important'
import GameProgressBar from '@components/ui/GameProgressBar'
import Button from '@components/ui/Button'
import { useState } from 'react'
import { useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export interface IGameCompletedData {
  //TODO: extend it
  score: number
}

type IGameEventData = number | IGameCompletedData | null

export interface IGameContainerProps {
  game: GameConfig;
  onComplete: (data: IGameCompletedData) => void;
}

const GameContainer = ({ game, onComplete }: IGameContainerProps): JSX.Element => {

  const [progressLevel, setProgressLevel] = useState(0)
  const [showProgress, setShowProgress] = useState(true)
  const [error, setError] = useState(false)

  const gameUrl = game.values?.last_version?.overrides?.game_url
  const gameFile = game.values?.invoke_file
  const versionedGameUrl = `${gameUrl}${gameFile}?ts=${Date.now()}`
  const gameVars = game.values?.last_version?.overrides?.extras

  const Lumos = {
    gamevars: {
      ...gameVars,
      game_resources_url: gameUrl,
    },
  }

  useEffect(() => {
    //todo: create game on backend
    return () => {
      window?.cc?.director?.end()
    }
  }, [])

  window.sendToJavaScript = (data: string | [string, IGameEventData], argData: IGameEventData) => {
    const [eventName, eventData] = (Array.isArray(data)) ? data : [data, argData]
    let parsedData = eventData
    switch (eventName) {
      case 'game:loadStart':
        setShowProgress(true)
        break
      case 'game:loadProgress':
        parsedData = Math.floor(Number(eventData) * 100)
        if (parsedData > progressLevel) {
          setProgressLevel(parsedData)
        }
        break
      case 'game:loadComplete':
        setShowProgress(false)
        break
      case 'game:complete':
        //TODO: save progress
        onComplete(eventData as IGameCompletedData)
        break
      default:
    }
    //    console.log('sendToJavascript', eventName, eventData)
  }

  window.Lumos = Lumos

  return (
    <div className={css([commonStyles.fullWidth, commonStyles.flexColumnAllCenter])}>
      {
        error &&
        <Alert variant="danger">Something went wrong</Alert>
      }
      <Card className={css([commonStyles.flexColumnAllCenter, styles.gameFrame])}>
        <Card.Body className={css(commonStyles.flexJustifyCenter)}>
          <div className='cocos3' id='game-manager'>
            <canvas
              id="gameCanvas"
              className={css([commonStyles.flexColumnAllCenter, styles.gameCanvas])}
              style={{ visibility: showProgress ? 'hidden' : 'visible' }}
            >
            </canvas>
          </div>
          {
            showProgress &&
            <GameProgressBar progressLevel={progressLevel} />
          }
          <Script onError={() => { setError(true) }} onLoad={() => { console.log('loaded') }} attributes={{ id: 'gameScript', ref: 'gameScript' }} url={versionedGameUrl} />
        </Card.Body>
      </Card>
      {publicRuntimeConfig.game_skip &&
        <div className={css([commonStyles.flexRowAllCenter, styles.skipTextdiv])}>
          <Button
            onClick={() => {
              window.sendToJavaScript('game:complete', { score: 0 })
            }}
            text="Skip Game"
          />
        </div>
      }
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
