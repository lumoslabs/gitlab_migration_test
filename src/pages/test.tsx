import { useEffect, useRef, useState } from "react"
import GameProgressBar from '@components/ui/GameProgressBar'
import GameWrapperIframe from '@components/ui/GameWrapperIframe'
import GameWrapperWindow, { GameWrapperRef } from "@components/ui/GameWrapperWindow"

export default function test(): JSX.Element {
  const [clientHeight, setHeight] = useState(0)
  const [clientWidth, setWidth] = useState(0)
  const [progressLevel, setProgressLevel] = useState(0)
  const [showProgress, setShowProgress] = useState(true)
  const gameRef = useRef<GameWrapperRef>()


  const onGameEvent = (eventName, eventData) => {
    console.log('eventListener', eventName, eventData)
    switch (eventName) {
      case 'game:loadStart':
        setShowProgress(true)
        break
      case 'game:loadProgress':
        eventData = Math.floor(Number(eventData) * 100)
        if (eventData > progressLevel) {
          setProgressLevel(eventData)
        }
        break
      case 'game:loadComplete':
        break
      case 'game:start':
        setShowProgress(false)
        break
    }
  }

  useEffect(() => {
    setHeight(window.innerHeight - 100)
    setWidth(window.innerWidth)
  }, [])



  return <>
    <div>
      {
        clientWidth &&
        clientHeight &&
        <GameWrapperWindow
          width={clientWidth}
          height={clientHeight}
          url={'https://assets.nest.lumosity.com/game-assets/ColorMatch_CC/nest_lowres/a213a4c63155fa5fde7fbe266d42654a33b71a56/289067450/release/game.js'}
          onEvent={onGameEvent}
          visibility={true}
          ref={gameRef}
          vars={{
            gamevars: {
              game_resources_url: 'https://assets.nest.lumosity.com/game-assets/ColorMatch_CC/nest_lowres/a213a4c63155fa5fde7fbe266d42654a33b71a56/289067450/release/',
              show_tutorial: false,
              game_param: 'color-match-none',
            }
          }}
        />
      }
      <button onClick={() => {
        gameRef?.current?.send({ action: 'cmm_start' })
      }}>send</button>
    </div>
    {showProgress && <GameProgressBar progressLevel={progressLevel} />}
  </>
}
