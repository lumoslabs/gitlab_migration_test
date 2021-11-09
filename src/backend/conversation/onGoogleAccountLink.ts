import { ConversationV3 } from 'actions-on-google'
//import appSharedActions from '@store/slices/appSharedActions'
import { sendCommand, encrypt } from './utils'
import LinkingService from '@backend/services/LinkingService'
import logger from '@backend/libs/logger'
import rollbar from '@backend/libs/rollbar'
import CatalogService from '@backend/services/ConfigService'
import ScoresManager from '@backend/libs/ScoresManager'

export default async (conv: ConversationV3) => {
  const linkingService = new LinkingService()
  const token = conv.headers?.authorization as string
  const userId = conv.user.params.id

  try {
    // Attempt to login with google token
    const accessToken = await linkingService.getUserAccessTokenById(userId, token)

    const catalog = await (new CatalogService()).getCatalogGames()

    //sync game results to user storage top scores
    const externalScores = await Promise.all(catalog.map(game => {
      return linkingService.api.getGameResults(accessToken, game.values.slug).then((scores) => {
        return {
          game: game.values.slug,
          scores: scores?.high_scores?.map(({ score, created_at }) => {
            return (score && created_at) ? {
              score,
              date: created_at
            } : null
          })
        }
      })
    }))

    const scores = externalScores.reduce((accum, { game, scores }) => {
      const scoresList = (new ScoresManager(conv.user.params.scores?.[game])).pushList(scores).get()
      accum[game] = scoresList
      return accum
    }, {})

    conv.user.params.scores = scores
    conv.user.params.lumosToken = await encrypt(accessToken)

  } catch (signinError) {
    try {
      // This user cannot be found in the lumosity database
      const user = await linkingService.createNewUser(token)
      const accessToken = await linkingService.getUserAccessTokenById(userId, token)
      await linkingService.setUserBirthday(user.id, accessToken, conv.user.params.ageGate.birthday)
      conv.user.params.lumosToken = await encrypt(accessToken)

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
      /*
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
      */
    ]
  })
}
