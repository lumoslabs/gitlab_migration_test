import { ConversationV3 } from 'actions-on-google'
import appSharedActions from '@store/slices/appSharedActions'
import { convToUser, sendCommand } from './utils'
import LinkingService from '@backend/services/LinkingService'
import logger from '@backend/libs/logger'

export default async (conv: ConversationV3) => {
  const linkingService = new LinkingService()
  const token = conv.headers?.authorization as string
  const userId = conv.user.params.id

  try {
    //try to login with google token
    await linkingService.linkExistingUserByToken(userId, token)
    conv.user.params.isLinked = true
  } catch (signinError) {
    try {
      //looks like user doesn't exists in lumosity site
      await linkingService.createNewUser(token)
      await linkingService.linkExistingUserByToken(userId, token)
      conv.user.params.isLinked = true
    } catch (signupError) {
      //something went wrong with api or current user storage
      logger.error(signupError, 'Linking user error')
      conv.add('Error linking account. Please try again later.')
    }
  }

  sendCommand({
    conv,
    commands: [
      {
        command: appSharedActions.GO_TO,
        payload: '/home'
      },
      {
        command: appSharedActions.SET_STORE,
        payload: {
          user: convToUser(conv)
        }
      }
    ]
  })
}
