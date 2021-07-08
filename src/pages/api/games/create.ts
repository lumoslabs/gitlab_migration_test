import type { NextApiResponse } from 'next'
import CatalogService from '@backend/services/ConfigService'
import GameService from '@backend/services/GameService'
import withUser, { NextApiRequestWithUser } from '@backend/libs/withUser'
import withExceptionHandler from '@backend/libs/withExceptionHandler'
import ValidationError, { ValidationRules } from '@backend/errors/ValidationError'

/**
 * @curl
 * curl -v -XPOST -H "Content-type: application/json" -d '{"slug":"color-match-nest"}' 'http://localhost:7300/api/games/create'
 */

/**
 * @swagger
 * /api/games/create:
 *   post:
 *     tags:
 *      - Game run
 *     description: Create new game run
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            properties:
 *              slug:
 *                type: string
 *            example:
 *              slug: color-match-nest
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
 *              id: 'uuid-uuid-uuid'
 */
const handler = (async (req: NextApiRequestWithUser, res: NextApiResponse): Promise<void> => {
  const catalogService = new CatalogService()
  const gameService = new GameService()
  const slug = req.body?.slug
  console.log('req', req.body)
  if (!slug) {
    throw new ValidationError('slug', ValidationRules.REQUIRED)
  }
  const game = await catalogService.getCatalogGameBySlug(slug)
  if (!game) {
    throw new ValidationError('slug', ValidationRules.INCORRECT)
  }
  const id = await gameService.createGameRun({
    game_version: game.values?.last_version?.id,
    game_slug: game.id,
    user_id: req.user?.id
  })
  res.send({
    id
  })
})

export default withExceptionHandler(withUser(handler))
