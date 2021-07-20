import { ConversationV3 } from 'actions-on-google'
import { sendCommand } from '@backend/conversation/utils'

export default async (conv: ConversationV3) => {
  const score = conv.context?.canvas?.state?.score

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

  // Freeplay first play
  const singlePlayFirstPlayText = `You scored ${score} points. Great first play! 
  Would you like to return to the Lumosity main menu?`

  // Freeplay non first play
  const singlePlayNonFirstPlayTexts = [
    `You scored ${score} points. Well done! Would you like to return to the Lumosity main menu?`,
    `You scored ${score} points. Great job! Would you like to return to the Lumosity main menu?`,
    `You scored ${score} points. Congrats on a job well done. Would you like to return to the main menu?`,
  ]

  conv.add(singlePlayFirstPlayText)

  sendCommand({
    suppressMic: false,
    conv,
  })
}
