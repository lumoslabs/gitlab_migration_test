import { ConversationV3 } from 'actions-on-google'
import appSharedActions from '@store/slices/appSharedActions'
import { convToUser, getBirthday, getScoresList, setScoresList, Pages, sendCommand, setLumosToken } from './utils'
import LinkingService from '@backend/services/LinkingService'
import logger from '@backend/libs/logger'
import rollbar from '@backend/libs/rollbar'
import CatalogService from '@backend/services/ConfigService'
import { dayjs } from '@backend/libs/dayjs'
import ScoresManager from '@backend/libs/ScoresManager'

export default async (conv: ConversationV3) => {
  const linkingService = new LinkingService()
  const token = conv.headers?.authorization as string
  const userId = conv.user.params.id

  try {
    // Attempt to login with google token
    const accessToken = await linkingService.getUserAccessTokenById(userId, token)
    await setLumosToken(conv, accessToken)

    const catalog = await (new CatalogService()).getCatalogGames()

    //sync game results to user storage top scores
    const externalScores = await Promise.all(catalog.map(game => {
      return linkingService.api.getGameResults(accessToken, game.id).then((scores) => {
        return {
          game: game.id,
          scores: scores?.high_scores?.map(({ score, created_at }) => {
            return (score && created_at) ? {
              score,
              date: dayjs(created_at).utc().format()
            } : null
          })
        }
      })
    }))
    externalScores.forEach(({ game, scores }) => {
      const scoresList = (new ScoresManager(getScoresList(conv, game))).pushList(scores).get()
      if (scoresList.length) {
        setScoresList(conv, game, scoresList)
      }
    })

  } catch (signinError) {
    try {
      // This user cannot be found in the lumosity database
      const user = await linkingService.createNewUser(token)
      const accessToken = await linkingService.getUserAccessTokenById(userId, token)
      await linkingService.setUserBirthday(user.id, accessToken, getBirthday(conv))
      await setLumosToken(conv, accessToken)
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
