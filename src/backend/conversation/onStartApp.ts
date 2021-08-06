import { ConversationV3 } from 'actions-on-google'
import {
  sendCommand,
  getPublicUrlFromConv,
  setIsFirstLogin,
  setTraining,
  getTraining,
  convToUser,
  getBirthday,
  Scenes,
  Pages
} from '@backend/conversation/utils'
import appSharedActions from '@store/slices/appSharedActions'
import AuthService from '@backend/services/AuthService'
import TrainingManager from '@backend/libs/TrainingManager'

export default async (conv: ConversationV3) => {
  const service = new AuthService()

  //Login or create new user, generate authtoken for api methods 
  const userId = conv.user.params?.id
  let user = null
  if (userId) {
    user = await service.getUser(userId)
  }

  if (!user) {
    user = await service.createNewUser()
    setIsFirstLogin(conv)
  }

  const authToken = await service.generateToken(user)
  conv.user.params.id = user.id

  //Generate training
  const trainingManager = new TrainingManager(getTraining(conv), conv?.device?.timeZone?.id)
  const training = await trainingManager.get()

  setTraining(conv, training)

  //Generate tutorial object
  const tutorial = Object.keys(conv.user.params?.scores ?? {}).reduce((accum, gameName) => {
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
          baseUrl: getPublicUrlFromConv(conv),
          authToken,
          training,
          user: convToUser(conv),
          tutorial,
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
