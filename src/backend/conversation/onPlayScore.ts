import { ConversationV3 } from 'actions-on-google'
import { sendCommand, getRandomElement, getTraining, setTraining, getLumosToken, isLumosLinked, getScoresList, setScoresList } from '@backend/conversation/utils'
import { getCurrentUTCString } from '@backend/libs/dayjs'
import appSharedActions from '@store/slices/appSharedActions'
import TrainingManager from '@backend/libs/TrainingManager'
import onNoMatch from './onNoMatch'
import LumosRailsApi from '@backend/libs/LumosRailsApi'
import rollbar from '@backend/libs/rollbar'
import logger from '@backend/libs/logger'
import ScoresManager from '@backend/libs/ScoresManager'

export default async (conv: ConversationV3) => {
  const eventData = conv.context?.canvas?.state?.eventData
  const slug = String(conv.context?.canvas?.state?.slug)
  if ((!eventData) || (!slug)) {
    return onNoMatch(conv)
  }
  const isTraining = Boolean(conv.context?.canvas?.state?.isTraining)
  const score = Number(eventData?.score)
  let tts = null

  if (isLumosLinked(conv)) {
    try {
      const lumosAccessToken = await getLumosToken(conv)
      await (new LumosRailsApi()).saveGameResult(lumosAccessToken, slug, eventData)
    } catch (error) {
      rollbar?.error(error)
      logger.error(error, 'Game result sync error')
    }
  }


  const scoresList = getScoresList(conv, slug)
  if (!scoresList) {
    //first play in current game
    tts = `You scored ${score} points. Great first play! Would you like to return to the Lumosity main menu?`
  } else {
    tts = getRandomElement([
      `You scored ${score} points. Well done! Would you like to return to the Lumosity main menu?`,
      `You scored ${score} points. Great job! Would you like to return to the Lumosity main menu?`,
      `You scored ${score} points. Congrats on a job well done. Would you like to return to the main menu?`,
    ])
  }

  const scoresManager = new ScoresManager(scoresList)
  scoresManager.push({
    score,
    date: getCurrentUTCString(),
  })

  setScoresList(conv, slug, scoresManager.get())

  if (isTraining) {
    const trainingManager = new TrainingManager(getTraining(conv))
    trainingManager.markGameCompleted(slug)
    const allGamesCount = trainingManager.getWorkoutGamesCount()
    const remainingGamesCount = trainingManager.getUnplayedGamedCount() - 1

    if (allGamesCount - remainingGamesCount === 1) {
      tts = `You scored ${score} points. Great first play! Are you ready for the next game?`
    } else if (remainingGamesCount === 0) {
      tts = getRandomElement([
        `You scored ${score} points and completed your workout for today. Well done! 
        Would you like to return to the Lumosity main menu?`,
        `You scored ${score} points and completed today's workout. Great job! 
        Are you ready to return to the main menu?`,
        `You scored ${score} points and completed your workout. Congrats on a job well done. 
        Would you like to end your workout and return to the main menu?`,
      ])
    } else {
      tts = getRandomElement([
        `You scored ${score} points. Well done! Are you ready for the next game?`,
        `You just scored ${score} points. Great job! Are you ready to play your next game?`,
        `You scored ${score} points that time. Nice play! Ready for the next one?`
      ])
    }
    const training = await trainingManager.get()
    setTraining(conv, training)
  }

  if (tts) {
    conv.add(tts)
  }

  sendCommand({
    conv,
    suppressMic: false,
    commands: [
      {
        command: appSharedActions.SET_TOP_SCORES,
        payload: {
          slug,
          scores: getScoresList(conv, slug)
        }
      }
    ]
  })
}
