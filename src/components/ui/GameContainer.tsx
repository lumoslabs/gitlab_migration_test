/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getLastGameCommand, sendTextQuery, outputTts, exitContinuousMatchMode } from '@store/slices/appSlice'
import clonedeep from 'lodash.clonedeep'

const { publicRuntimeConfig } = getConfig()

export interface IGameSpeechData {
  text: string,
  prompt: boolean
}

export interface IGameCompletedData {
  //TODO: extend it
  score: number;
  session_level: number;
  user_level: number;
  game_result_data: unknown;
}

type IGameEventData = number | IGameCompletedData | IGameSpeechData | null

export interface IGameContainerProps {
  game: GameConfig;
  onComplete: (data: IGameCompletedData) => void;
}


//TODO: should we split logic to simplest functions?
const GameContainer = ({ game, onComplete }: IGameContainerProps): JSX.Element => {
  const [clientHeight, setHeight] = useState(0)
  const [clientWidth, setWidth] = useState(0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }, [])

  //
  const [progressLevel, setProgressLevel] = useState(0)
  const [showProgress, setShowProgress] = useState(true)
  const [error, setError] = useState(false)

  //selectors for app state
  const lastGameCommand = useAppSelector(getLastGameCommand)

  const gameUrl = game.values?.last_version?.overrides?.game_url
  const gameFile = game.values?.invoke_file
  const versionedGameUrl = `${gameUrl}${gameFile}?ts=${Date.now()}`

  window.Lumos = {
    gamevars: {
      ...game.values?.last_version?.overrides?.extras,
      game_resources_url: gameUrl,
    },
  }

  //Send parsed phrase to cocos
  useEffect(() => {
    if (lastGameCommand && window.sendEventToCocos) {
      window.sendEventToCocos(clonedeep(lastGameCommand))
    }
  }, [lastGameCommand])

  //Save game run into db and clear window before remove component
  useEffect(() => {
    //todo: create game on backend
    return () => {
      // Clear cocos3 scope
      window?.cc?.director?.end()
    }
  }, [])

  //handle game events
  window.sendToJavaScript = (data: string | [string, IGameEventData], argData: IGameEventData) => {
    const [eventName, eventData] = (Array.isArray(data)) ? data : [data, argData]
    let parsedData = eventData
    switch (eventName) {
      case 'game:loadStart':
        setShowProgress(true)
        //TODO: fix redux-toolkit thunk types
        //@ts-ignore
        dispatch(sendTextQuery({ query: 'Invoke Game Name Welcome Message', state: { 'name': game.values?.title } }))
        break
      case 'game:loadProgress':
        parsedData = Math.floor(Number(eventData) * 100)
        if (parsedData > progressLevel) {
          setProgressLevel(parsedData)
        }
        break
      case 'game:loadComplete':
        break
      case 'game:start':
        setShowProgress(false)
        break
      case 'game:nest_cmm_start':
        //TODO: fix redux-toolkit thunk types
        //@ts-ignore
        dispatch(sendTextQuery({ query: 'Invoke Start Game', state: { 'slug': game.id } }))
        break
      case 'game:complete':
        //TODO: fix redux-toolkit thunk types
        //@ts-ignore
        dispatch(exitContinuousMatchMode())
        onComplete(eventData as IGameCompletedData)
        break
      case 'game:nest_cmm_restart':
        //TODO: fix redux-toolkit thunk types
        //@ts-ignore
        dispatch(sendTextQuery({ query: 'Restart Continuous Match Mode', state: { 'slug': game.id } }))
        break
      case 'game:speech':
        parsedData = eventData as IGameSpeechData
        //@ts-ignore
        dispatch(outputTts(parsedData))
        break
      case 'game:pause':
        break
      case 'game:nest_cmm_pause':
        //TODO: fix redux-toolkit thunk types
        //@ts-ignore
        dispatch(exitContinuousMatchMode())
        break
      default:
        console.log('unhandled game event', eventName, eventData)
    }
  }
  /*
    case 'game:nest_cmm_restart':
      debugger;
      setRestartContinuousMatch(true);
      break;
    case 'game:resume':
    case 'game:nest_cmm_resume':
      setResumeContinuousMatch(true);
      break;
    case 'game:quit':
      setEndContinuousMatch(true);
      props.abortGame();
      break;
  */
  return (
    <div className={css([commonStyles.fullWidth, commonStyles.flexColumnAllCenter])}>
      {error && <Alert variant="danger">Something went wrong</Alert>}
      <Card className={css([commonStyles.flexColumnAllCenter, styles.gameFrame])}>
        <Card.Body className={css(commonStyles.flexJustifyCenter)}>
          <div className='cocos3' id='game-manager'>
            <canvas
              id="gameCanvas"
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
      {publicRuntimeConfig.game_skip && (
        <div className={css([commonStyles.flexRowAllCenter, styles.skipGameDiv])}>
          <Button buttonStyles={styles.skipGameButton}
            onClick={() => { window.sendToJavaScript('game:complete', { score: 0 }) }}
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
