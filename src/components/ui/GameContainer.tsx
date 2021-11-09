import React, { useState, useEffect, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import { css, StyleSheet } from 'aphrodite/no-important'
import { Alert } from 'react-bootstrap'
import getConfig from 'next/config'
import { GameConfig } from '@backend/services/ConfigService'
import commonStyles from '@styles/commonStyles'
import GameProgressBar from '@components/ui/GameProgressBar'
import Button from '@components/ui/Button'
import useAmplitude from '@hooks/useAmplitude'
import useInteractiveCanvas, { Intents } from '@hooks/useInteractiveCanvas'
import useAppBusListener from '@hooks/useAppBusListener'
import { GameWrapperRef, GameEventData, GameSpeechData, GameCompletedData } from './GameWrapperWindow'
import GameWrapper from './GameWrapperIframe'
import { useCallback } from 'react'
import useExpect from '@hooks/useExpect'

const { publicRuntimeConfig } = getConfig()

export interface IGameContainerProps {
  game: GameConfig;
  onComplete: (data: GameCompletedData) => void;
  showTutorial: boolean;
  onEvent?: (eventName: string, data: any) => void;
}

const GameContainer = ({ game, onComplete, onEvent = () => undefined, showTutorial }: IGameContainerProps): JSX.Element => {
  const track = useAmplitude()
  const { sendTextQuery, outputTts, enterContinuousMatchMode, exitContinuousMatchMode } = useInteractiveCanvas()
  // Set the dimensions of the screen for game layout
  const [clientHeight, setHeight] = useState(0)
  const [clientWidth, setWidth] = useState(0)

  const gameRef = useRef<GameWrapperRef>()

  useExpect(Intents.HELP, () => {
    gameRef.current?.send({ action: 'tutorial' })
  })

  useExpect(Intents.RESTART_GAME, () => {
    gameRef.current?.send({ action: 'restart' })
  })

  useExpect(Intents.RESUME_GAME, () => {
    gameRef.current?.send({ action: 'resume' })
  })

  useEffect(() => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)

    return () => {
      // try to exit from cmm
      exitContinuousMatchMode()
    }
  }, [])

  // Game loading progress for loading bar and errors
  const [progressLevel, setProgressLevel] = useState(0)
  const [showProgress, setShowProgress] = useState(true)
  const [error, setError] = useState(false)

  // Game info
  const gameUrl = game.values?.last_version?.overrides?.game_url
  const gameFile = game.values?.invoke_file
  const versionedGameUrl = `${gameUrl}${gameFile}?ts=${Date.now()}`

  // Handle game events
  const onGameEvent = useCallback((eventName: string, eventData: GameEventData) => {
    const eventTracking = {
      slug: game?.id,
      version: game?.values?.last_version?.id,
      gameData: eventData ? eventData : undefined
    }

    switch (eventName) {
      case 'game:loadStart':
        setShowProgress(true)
        track('game_load_start', eventTracking)
        break
      case 'game:loadProgress':
        eventData = Math.floor(Number(eventData) * 100)
        if (eventData > progressLevel) {
          setProgressLevel(eventData)
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
        eventData = eventData as any[]
        enterContinuousMatchMode(eventData)
        break
      case 'game:complete':
        onEvent(eventName, eventData)
        onComplete(eventData as GameCompletedData)
        exitContinuousMatchMode()
        track('game_finish', eventTracking)
        break
      case 'game:nest_cmm_restart':
        eventData = eventData as any[]
        enterContinuousMatchMode(eventData)
        break
      case 'game:speech':
        eventData = eventData as GameSpeechData
        outputTts(eventData.text, eventData.prompt)
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
  }, [])

  const sendFakeCompleteEvent = useCallback(() => {
    onGameEvent('game:complete', { score: Math.floor(Math.random() * 1000), game_result_data: { num_correct: 10 }, session_level: 0, user_level: 0 })
  }, [])

  //Handle interactive canvas events
  useAppBusListener('onPhraseMatched', (data) => {
    gameRef.current?.send(data)
  })
  useAppBusListener('onListeningModeChanged', (isCmm) => {
    gameRef.current?.send({ action: isCmm ? 'cmm_start' : 'cmm_end' })
  })
  useAppBusListener('onTtsMark', (markName) => {
    gameRef.current?.send({ action: 'tts_' + markName.toLowerCase() })
  })

  return (
    <div className={css([commonStyles.fullWidth, commonStyles.flexColumnAllCenter])}>
      {error && <Alert variant='danger'>Something went wrong</Alert>}
      <Card className={css([commonStyles.flexColumnAllCenter, styles.gameFrame])}>
        <Card.Body className={css(commonStyles.flexJustifyCenter)}>
          {clientWidth && clientHeight &&
            <GameWrapper
              width={clientWidth}
              height={clientHeight}
              url={versionedGameUrl}
              vars={{
                gamevars: {
                  ...game.values?.last_version?.overrides?.extras,
                  game_resources_url: gameUrl,
                  show_tutorial: showTutorial,
                  game_param: game?.values.slug,
                  languageVariant: navigator?.language
                },
              }}
              onEvent={onGameEvent}
              onError={() => { setError(true) }}
              ref={gameRef}
            />
          }
          {showProgress && <GameProgressBar title={game.values?.title} progressLevel={progressLevel} />}
        </Card.Body>
      </Card>
      {publicRuntimeConfig.gameSkip && (
        <div className={css([commonStyles.flexRowAllCenter, styles.skipGameDiv])}>
          <Button buttonStyles={styles.skipGameButton}
            onClick={sendFakeCompleteEvent}
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
