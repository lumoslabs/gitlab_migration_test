import { ConversationV3 } from 'actions-on-google'
import {
  sendCommand,
  getPublicUrlFromConv,
  getIsFirstLogin,
  setIsFirstLogin,
  setTraining,
  getTraining,
  convToUser
} from '@backend/conversation/utils'
import appSharedActions from '@store/slices/appSharedActions'
import AuthService from '@backend/services/AuthService'
import { AccountLinkingStatus } from 'actions-on-google/dist/api/schema'
import logger from '@backend/libs/logger'
import TrainingManager from '@backend/libs/TrainingManager'

export default async (conv: ConversationV3) => {
  const service = new AuthService()
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

  logger.debug(`onStartAppEvent user #${conv.user?.params?.id}`)
  logger.debug(conv.user.params.isLinked, `conv.user.params.isLinked ${conv.user.params.isLinked}`)
  conv.user.params.id = user.id
  if (getIsFirstLogin(conv)) {
    conv.add('Welcome to Lumosity. You can say play a game or do a workout. What would you like to do today?')
  } else {
    if (conv.user.accountLinkingStatus !== AccountLinkingStatus.Linked) {
      conv.add('Welcome back. What would you like to do today?')
    } else {
      conv.add('You can say play a game or do a workout. What would you like to do today?');
    }
  }

  const trainingManager = new TrainingManager(getTraining(conv))
  const training = await trainingManager.get()

  setTraining(conv, training)

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
          user: convToUser(conv)
        }
      }
    ]
  })
}
