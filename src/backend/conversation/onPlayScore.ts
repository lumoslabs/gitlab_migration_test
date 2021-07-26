import { ConversationV3 } from 'actions-on-google'
import { sendCommand, getRandomElement } from '@backend/conversation/utils'
import dayjs, { getCurrentUTCString } from '@backend/libs/dayjs'
import appSharedActions from '@store/slices/appSharedActions'

export default async (conv: ConversationV3) => {
  const score = Number(conv.context?.canvas?.state?.score)
  const slug = String(conv.context?.canvas?.state?.slug)
  console.log('onPlayScore', score, slug)
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

  try {
    conv.user.params.scores[slug].push({
      score,
      date: getCurrentUTCString(),
      i: conv.user.params.scores[slug].length + 1
    })
    conv.user.params.scores[slug] = conv.user.params.scores[slug].sort((a, b) => {
      if (a.score === b.score) {
        return b.i - a.i
      }
      return b.score - a.score
    }).slice(0, 5)
  } catch (error) {
    console.log('error', error)
  }

  /*
  // TODO: implement different messages based off workout or freeplay, number of plays
  // Workout first play with more games to play
  const workoutIncompleteFirstPlayText = `You scored ${score} points. Great first play! Are you ready for the next game?`

  // Workout non first play with more games to play
  const workoutIncompleteNonFirstPlayTexts = [
    `You scored ${score} points. Well done! Are you ready for the next game?`,
    `You just scored ${score} points. Great job! Are you ready to play your next game?`,
    `You scored ${score} points that time. Nice play! Ready for the next one?`
  ]

  // Complete Workout with first play
  const workoutCompleteFirstPlayText = `You scored ${score} points. Great first play! 
  This concludes your workout, would you like to return to the Lumosity main menu?`

  // Complete Workout non first play
  const workoutCompleteNonFirstPlayTexts = [
    `You scored ${score} points and completed your workout for today. Well done! 
      Would you like to return to the Lumosity main menu?`,
    `You scored ${score} points and completed today's workout. Great job! 
      Are you ready to return to the main menu?`,
    `You scored ${score} points and completed your workout. Congrats on a job well done. 
      Would you like to end your workout and return to the main menu?`,
  ]
*/

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
