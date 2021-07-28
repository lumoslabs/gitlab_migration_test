import { ConversationV3 } from 'actions-on-google'
import { sendCommand, getRandomElement } from '@backend/conversation/utils'
import dayjs, { getCurrentUTCString } from '@backend/libs/dayjs'
import appSharedActions from '@store/slices/appSharedActions'
import TrainingManager from '@backend/libs/TrainingManager'

export default async (conv: ConversationV3) => {
  const score = Number(conv.context?.canvas?.state?.score)
  const slug = String(conv.context?.canvas?.state?.slug)
  const isTraining = Boolean(conv.context?.canvas?.state?.isTraining)

  let tts = null

  if (!conv.user.params.scores) {
    //first play
    conv.user.params.scores = {}
  }
  if (!conv.user.params.scores[slug]) {
    //first play in current game
    tts = `You scored ${score} points. Great first play! Would you like to return to the Lumosity main menu?`
    conv.user.params.scores[slug] = []
  } else {
    tts = getRandomElement([
      `You scored ${score} points. Well done! Would you like to return to the Lumosity main menu?`,
      `You scored ${score} points. Great job! Would you like to return to the Lumosity main menu?`,
      `You scored ${score} points. Congrats on a job well done. Would you like to return to the main menu?`,
    ])
  }

  conv.user.params.scores[slug].push({
    score,
    date: getCurrentUTCString(),
    i: Number(conv.user.params.scores[slug].reduce((accum, current) => accum > current.i ? accum : current.i, 0)) + 1
  })
  conv.user.params.scores[slug] = conv.user.params.scores[slug].sort((a, b) => {
    if (a.score === b.score) {
      return b.i - a.i
    }
    return b.score - a.score
  }).slice(0, 5)


  if (isTraining) {
    const trainingManager = new TrainingManager(conv.user.params.training)
    trainingManager.markGameCompleted(slug)
    const allGamesCount = trainingManager.getWorkoutGamesCount()
    const remainGamesCount = trainingManager.getUnplayedGamedCount()

    if (allGamesCount - remainGamesCount === 1) {
      tts = `You scored ${score} points. Great first play! Are you ready for the next game?`
    } else if (remainGamesCount === 0) {
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
    conv.user.params.training = await trainingManager.get()
  }

  if (tts) {
    conv.add(tts)
  }

  sendCommand({
    conv,
    suppressMic: false,
    command: appSharedActions.SET_TOP_SCORES,
    payload: {
      slug,
      scores: conv.user.params.scores[slug]
    }
  })
}
