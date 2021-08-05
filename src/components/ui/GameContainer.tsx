import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Script from 'react-load-script'
import { css, StyleSheet } from 'aphrodite/no-important'
import { Alert } from 'react-bootstrap'
import getConfig from 'next/config'
import { GameConfig } from '@backend/models/config'
import commonStyles from '@styles/commonStyles'
import GameProgressBar from '@components/ui/GameProgressBar'
import Button from '@components/ui/Button'
import useAmplitude from '@hooks/useAmplitude'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'
import useAppBusListener from '@hooks/useAppBusListener'
const { publicRuntimeConfig } = getConfig()

export interface IGameSpeechData {
  text: string,
  prompt: boolean
}

export interface IGameCompletedData {
  score: number;
  session_level: number;
  user_level: number;
  game_result_data: unknown;
}

type IGameEventData = number | IGameCompletedData | IGameSpeechData | null

export interface IGameContainerProps {
  game: GameConfig;
  onComplete: (data: IGameCompletedData) => void;
  onEvent: (eventName: string, data: any) => void;
  isTraining: boolean;
}

const GameContainer = ({ game, onComplete, onEvent, isTraining }: IGameContainerProps): JSX.Element => {
  const track = useAmplitude()
  const { sendTextQuery, outputTts, exitContinuousMatchMode } = useInteractiveCanvas()

  // Set the dimensions of the screen for game layout
  const [clientHeight, setHeight] = useState(0)
  const [clientWidth, setWidth] = useState(0)

  useEffect(() => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }, [])

  // Game loading progress for loading bar and errors
  const [progressLevel, setProgressLevel] = useState(0)
  const [showProgress, setShowProgress] = useState(true)
  const [error, setError] = useState(false)

  // Game info
  const gameUrl = game.values?.last_version?.overrides?.game_url
  const gameFile = game.values?.invoke_file
  const versionedGameUrl = `${gameUrl}${gameFile}?ts=${Date.now()}`

  // window vars for the game
  window.Lumos = {
    gamevars: {
      ...game.values?.last_version?.overrides?.extras,
      game_resources_url: gameUrl,
    },
  }

  //Handle interactive canvas events
  useAppBusListener('onPhraseMatched', (data) => {
    window.sendEventToCocos(data)
  })

  useAppBusListener('onListeningModeChanged', (isCmm) => {
    window.sendEventToCocos({ action: isCmm ? 'cmm_start' : 'cmm_end' })
  })

  useAppBusListener('onTtsMark', (tts) => {
    if (window.sendEventToCocos) {
      window.sendEventToCocos({ action: 'tts_' + tts.toLowerCase() })
    }
  })

  // Handle game events
  useEffect(() => {
    window.sendToJavaScript = (data: string | [string, IGameEventData], argData: IGameEventData) => {
      const [eventName, eventData] = (Array.isArray(data)) ? data : [data, argData]
      const eventTracking = {
        slug: game?.id,
        version: game?.values?.last_version?.id,
        gameData: eventData ? eventData : undefined
      }

      let parsedData = eventData

      switch (eventName) {
        case 'game:loadStart':
          setShowProgress(true)
          track('game_load_start', eventTracking)
          break
        case 'game:loadProgress':
          parsedData = Math.floor(Number(eventData) * 100)
          if (parsedData > progressLevel) {
            setProgressLevel(parsedData)
          }
          break
        case 'game:loadComplete':
          onEvent(eventName, eventData)
          track('game_load_complete', eventTracking)
          break
        case 'game:start':
          onEvent(eventName, eventData)
          setShowProgress(false)
          track('game_start', eventTracking)
          break
        case 'game:nest_cmm_start':
          sendTextQuery('Invoke Start Game', { slug: game.id })
          break
        case 'game:complete':
          onEvent(eventName, eventData)
          onComplete(eventData as IGameCompletedData)
          exitContinuousMatchMode().then(() => {
            parsedData = eventData as IGameCompletedData
            sendTextQuery('Invoke Score Screen Score TTS', { score: parsedData?.score, slug: game.id, isTraining: isTraining })
          })
          track('game_finish', eventTracking)
          break
        case 'game:nest_cmm_restart':
          sendTextQuery('Restart Continuous Match Mode', { slug: game.id })
          break
        case 'game:speech':
          parsedData = eventData as IGameSpeechData
          outputTts(parsedData.text, parsedData.prompt)
          break
        case 'game:pause':
          break
        case 'game:nest_cmm_pause':
          exitContinuousMatchMode()
          break
        case 'game:quit':
          track('game_quit', eventTracking)
          sendTextQuery('Home')
          break
        //case 'game:resume':
        //case 'game:abort_update':
        //case 'game:nest_cmm_resume':
        default:
          console.log('unhandled game event', eventName, eventData)
      }
    }
    return () => {
      //eslint-disable-next-line @typescript-eslint/no-empty-function
      window.sendToJavaScript = () => { }
      // Clear cocos3 scope
      window?.cc?.director?.end()
      // try to exit from cmm
      exitContinuousMatchMode()
    }
  }, [])

  return (
    <div className={css([commonStyles.fullWidth, commonStyles.flexColumnAllCenter])}>
      {error && <Alert variant='danger'>Something went wrong</Alert>}
      <Card className={css([commonStyles.flexColumnAllCenter, styles.gameFrame])}>
        <Card.Body className={css(commonStyles.flexJustifyCenter)}>
          <div className='cocos3' id='game-manager'>
            <canvas
              id='gameCanvas'
              className={css(commonStyles.flexColumnAllCenter)}
              style={{ visibility: showProgress ? 'hidden' : 'visible' }}
              width={clientWidth}
              height={clientHeight}
            />
          </div>
          {showProgress && <GameProgressBar progressLevel={progressLevel} />}
          <Script
            onError={() => { setError(true) }}
            onLoad={() => { console.log('loaded') }}
            attributes={{ id: 'gameScript', ref: 'gameScript' }}
            url={versionedGameUrl}
          />
        </Card.Body>
      </Card>
      {publicRuntimeConfig.gameSkip && (
        <div className={css([commonStyles.flexRowAllCenter, styles.skipGameDiv])}>
          <Button buttonStyles={styles.skipGameButton}
            onClick={() => { window.sendToJavaScript('game:complete', { score: Math.floor(Math.random() * 1000) }) }}
            text='Skip Game'
          />
        </div>
      )}
    </div>
  )
}

const styles = StyleSheet.create({
  gameFrame: {
    height: '100%',
    background: 'transparent',
    border: '0px'
  },
  skipGameDiv: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 1,
    margin: 0,
    padding: 0
  },
  skipGameButton: {
    backgroundColor: 'transparent'
  }
})

export default GameContainer
