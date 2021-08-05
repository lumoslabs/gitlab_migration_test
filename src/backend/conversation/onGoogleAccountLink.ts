import { ConversationV3 } from 'actions-on-google'
import appSharedActions from '@store/slices/appSharedActions'
import { convToUser, getBirthday, Pages, sendCommand } from './utils'
import LinkingService from '@backend/services/LinkingService'
import logger from '@backend/libs/logger'
import rollbar from '@backend/libs/rollbar'

export default async (conv: ConversationV3) => {
  const linkingService = new LinkingService()
  const token = conv.headers?.authorization as string
  const userId = conv.user.params.id

  try {
    // Attempt to login with google token
    await linkingService.linkExistingUserByToken(userId, token)
    conv.user.params.isLinked = true
  } catch (signinError) {
    try {
      // This user cannot be found in the lumosity database
      const user = await linkingService.createNewUser(token)
      const accessToken = await linkingService.linkExistingUserByToken(userId, token)
      await linkingService.setUserBirthday(user.id, accessToken, getBirthday(conv))
      conv.user.params.isLinked = true
    } catch (signupError) {
      //something went wrong with api or current user storage
      rollbar?.error(signupError)
      logger.error(signupError, 'Error linking user account')
      conv.add('There was an error linking your account. Please try again later.')
    }
  }

  sendCommand({
    conv,
    commands: [
      {
        command: appSharedActions.GO_TO,
        payload: Pages.Home
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
