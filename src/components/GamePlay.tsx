import { useState, useEffect } from 'react'
import { GameConfig } from '@backend/services/ConfigService'
import GameContainer from '@components/ui/GameContainer'
import GameScoreCard from '@components/ui/GameScoreCard'
import LoadingComponent from '@components/ui/LoadingComponent'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getTopScores, actions, getTutorialSeen } from '@store/slices/appSlice'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'
import sample from 'lodash.sample'
import useAppBusListener from '@hooks/useAppBusListener'

/*
Example:
window.sendToJavaScript('game:complete', {"score":4500,"session_level":0,"user_level":0,"game_result_data":{"num_correct":9,"num_tries":0,"num_pauses":0,"num_defocus":0,"num_restart":0,"width":360,"height":480,"locale_id":"en_US","default_locale_id":"","version":"30103","seed":1626112524963,"num_problems":13,"num_tries_corrections":0,"num_corrections":0,"cheatCount":0,"punishmentTime":0,"speed":19,"num_problems_correct":9,"response_time_correct":4274,"time":60811,"playTime":60811,"fit_test":"F","average_frame":17,"slowest_frame":245,"slowest_frame_at_time":365,"game_sound_on":true,"pauses":"","tutorial_start":0,"tutorial_finish":0,"tutorial":"","trial_csv":"response_id,type,response,correct,num_drops,water_level,problem,horizontal,vertical,speed,time_offset,response_time,input_type,num_corrections,regulateRate,nextUpThreshold,spawnPeriod/1,P,T,T,2,0,7-3,235,182,36,5050,6051,S,0,723,7,1908/2,P,T,T,2,0,5-2,152,105,36,11101,3850,S,0,500,10,2603/3,P,T,T,2,0,3-1,522,59,36,14951,2550,S,0,500,10,3724/4,P,,F,2,0,9+1,572,360,36,6985,10983,,0,500,10,3687/7,P,T,T,1,1,5+4,140,127,29,17968,5534,S,0,1417,4,3687/8,P,T,T,1,1,7+1,345,51,28,23502,3100,S,0,2356,2,1288/9,P,T,T,2,1,9-8,214,64,28,27219,3483,S,0,1986,5,602/10,P,T,T,2,1,3-3,476,140,28,26602,6162,S,0,1257,8,901/13,P,T,T,2,1,3*4,377,151,29,32764,6367,S,0,500,20,1409/16,P,,F,2,1,1*3,501,335,28,30702,12852,,0,500,20,3506/16,P,,F,2,1,7-6,552,96,29,39131,4423,,0,500,20,3506/17,P,T,T,1,2,2-1,209,1,24,43554,1366,S,0,809,6,3506/20,P,,F,1,2,8+1,78,310,23,44920,14858,,0,500,6,2144","response_csv":"","dpi":96,"num_trials":13,"num_responses":0},"gameStats":{"NumberOfTrialsCorrect":9},"bestStatKey":"NumberOfTrialsCorrect","stat":9,"specName":"Raindrops"})
*/

export default function GamePlay({
  game,
  onFinishHandler,
  isTraining,
  scoreActionButtonText,
  remainingGamesCount,
  totalGameCount,
  onGameComplete,
}: {
  game: GameConfig,
  onFinishHandler: () => void,
  isTraining: boolean,
  scoreActionButtonText: string,
  remainingGamesCount?: number,
  totalGameCount?: number,
  onGameComplete?: () => any,
}): JSX.Element {
  const dispatch = useAppDispatch()
  const [result, setResult] = useState(null)
  const topScores = useAppSelector(getTopScores)[game.id]
  const { outputTts } = useInteractiveCanvas()
  const showTutorial = !useAppSelector(getTutorialSeen)[game.id]

  const onComplete = (data: any) => {
    setResult(data)
    onGameComplete && onGameComplete()
    dispatch(actions.setTutorialSeen({ slug: game.id }))
  }

  // Create game run/results
  useEffect(() => {
    dispatch(actions.resetTopScores())
    setResult(null)

    //GameWelcomeMessage
    if (!isTraining) {
      outputTts(`Okay. Let's play ${game.values?.title}`)
    } else {
      if (remainingGamesCount === totalGameCount) {
        outputTts(sample([
          `Okay, let's start with ${game.values?.title}.`,
          `Okay, today we'll start with ${game.values?.title}.`,
        ]))
      } else if (remainingGamesCount === 0) {
        outputTts(sample([
          `Your last game today is ${game.values?.title}.`,
          `Your final game today is ${game.values?.title}.`,
          `And finally, you'll play ${game.values?.title}.`,
        ]))
      } else {
        outputTts(sample([
          `Next, we'll play ${game.values?.title}.`,
          `Next up, we have ${game.values?.title}.`,
        ]))
      }
    }
  }, [game])

  useAppBusListener('onIntentYes', () => {
    if (result) {
      onFinishHandler()
    }
  })

  useAppBusListener('onIntentHelp', () => {
    if (result) {
      if (isTraining) {
        outputTts(`Here is what you can do, you can say "Next" to go to your next game. "Home" to end your workout and return to the main menu, or "Exit" to leave Lumosity.`)
      } else {
        outputTts(`Here is what you can do, you can say "Next" or "Home" to return to the main menu, or "Exit" to leave Lumosity.`)
      }
    }
  })

  const showTrainingIcon = isTraining

  const statLabel = game.values.stat_label

  // Data from current game result
  const stat = result?.stat

  return (
    <main>
      {(!result) && (
        <GameContainer
          showTutorial={showTutorial}
          game={game}
          onComplete={onComplete}
          isTraining={isTraining}
        />
      )}
      {result && (topScores === null) && <LoadingComponent />}
      {result && (topScores !== null) && (
        <GameScoreCard
          title={game.values.title}
          gameIcon={game.values.score_thumbnail_url}
          showTrainingIcon={showTrainingIcon}
          currentScore={result?.score}
          topScoresData={topScores}
          actionButtonText={scoreActionButtonText}
          actionButtonHandler={onFinishHandler}
          stat={stat}
          statLabel={statLabel}
          remainingGamesCount={remainingGamesCount}
          totalGameCount={totalGameCount}
        />
      )}
    </main>
  )
}
