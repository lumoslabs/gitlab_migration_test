import { ConversationV3 } from 'actions-on-google'
import {
  sendCommand,
  setIsFirstLogin,
  setTraining,
  getTraining,
  convToUser,
  getBirthday,
  Scenes,
  Pages
} from '@backend/conversation/utils'
import appSharedActions from '@store/slices/appSharedActions'
import TrainingManager from '@backend/libs/TrainingManager'
import { v4 as uuidv4 } from 'uuid'

export default async (conv: ConversationV3) => {

  //Generate user id for new users
  if (!conv.user.params?.id) {
    setIsFirstLogin(conv)
    conv.user.params.id = uuidv4()
  }

  //Generate training
  const trainingManager = new TrainingManager(getTraining(conv), conv?.device?.timeZone?.id)
  const training = await trainingManager.get()

  setTraining(conv, training)

  //Generate tutorial object
  const tutorialSeen = Object.keys(conv.user.params?.scores ?? {}).reduce((accum, gameName) => {
    accum[gameName] = true
    return accum
  }, {})


  let nextScene = Scenes.Main
  let nextPage = Pages.Home

  // Check if age already confirmed
  if (!getBirthday(conv)) {
    nextPage = Pages.AgeGate
    nextScene = Scenes.AgeGate
  }

  sendCommand({
    conv,
    suppressMic: false,
    commands: [
      {
        command: appSharedActions.SET_STORE,
        payload: {
          training,
          user: convToUser(conv),
          tutorialSeen,
        }
      },
      {
        command: appSharedActions.GO_TO,
        payload: nextPage
      }
    ],
    scene: nextScene
  })
}
