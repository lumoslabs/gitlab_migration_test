import type { NextApiResponse } from 'next'
import GameService from '@backend/services/GameService'
import withUser, { NextApiRequestWithUser } from '@backend/libs/withUser'
import withExceptionHandler from '@backend/libs/withExceptionHandler'
import { GameEvents } from '@backend/models/gameRun'
import ValidationError, { ValidationRules } from '@backend/errors/ValidationError'
import ForbiddenError from '@backend/errors/ForbiddenError'
import LumosRailsApi from '@backend/libs/LumosRailsApi'
import AuthService from '@backend/services/AuthService'
import logger from '@backend/libs/logger'
import rollbar from '@backend/libs/rollbar'

/**
 * @curl
 * curl -v -XPOST -H "Content-type: application/json" -d '{"id":"3cd723b5-40ec-48c3-9d59-65ffb3e8afd8"}' 'http://localhost:7300/api/games/update'
 */

/**
 * @swagger
 * /api/games/update:
 *   post:
 *     tags:
 *      - Game run
 *     description: Update existing game run
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            properties:
 *              id:
 *                type: string
 *              eventName:
 *                type: string
 *                enum: ['game:start', 'game:loadComplete', 'game:loadComplete']
 *              eventData:
 *                type: object
 *            example:
 *              id: uuid-uuid-uuid
 *              eventName: 'game:start'
 *              eventData:
 *                score: 100
 *     responses:
 *       200:
 *         description: id of game run
 *         content:
 *          application/json:
 *            schema:
 *              type: Object
 *              properties:
 *                id:
 *                  type: string
 *            example:
 *              id: 'qwerqwer-1234234-234234'
 */
const handler = async (req: NextApiRequestWithUser, res: NextApiResponse): Promise<void> => {
  const gameService = new GameService()

  const id = req.body?.id
  const eventName = req.body?.eventName

  if (!id) {
    throw new ValidationError('id', ValidationRules.REQUIRED)
  }
  const gameRun = await gameService.getGameRun(id)

  if (!gameRun || (req.user.id != gameRun.user_id)) {
    throw new ForbiddenError()
  }

  if (!Object.values(GameEvents).includes(eventName)) {
    throw new ValidationError('eventName', ValidationRules.INCORRECT)
  }

  await gameService.updateGameRun(
    id,
    eventName,
    req.body?.eventData
  )

  if (req.user.id && (eventName === GameEvents.COMPLETED)) {
    const user = await (new AuthService()).getUser(req.user.id)
    if (user?.lumosity_access_token) {
      try {
        await (new LumosRailsApi()).saveGameResult(user.lumosity_access_token, gameRun.game_slug, req.body?.eventData)
      } catch (error) {
        rollbar?.error(error, req)
        logger.error(error, 'Game result sync error')
      }
    }
  }

  res.send({
    id
  })
}

export default withExceptionHandler(withUser(handler))
