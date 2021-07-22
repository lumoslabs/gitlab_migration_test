import type { NextApiResponse } from 'next'
import GameService from '@backend/services/GameService'
import withUser, { NextApiRequestWithUser } from '@backend/libs/withUser'
import withExceptionHandler from '@backend/libs/withExceptionHandler'
import ValidationError, { ValidationRules } from '@backend/errors/ValidationError'

/**
 * @swagger
 * /api/games/scores:
 *   get:
 *     tags:
 *      - Game run
 *     description: Get high scores data for user
 *     Q:
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
 *                score:
 *                  type: number
 *            example:
 *              id: 'qwerqwer-1234234-234234'
 */
const handler = async (req: NextApiRequestWithUser, res: NextApiResponse): Promise<void> => {
  const gameService = new GameService()
  const slug = req.query?.slug

  if ((!slug) || (typeof slug != 'string')) {
    throw new ValidationError('slug', ValidationRules.REQUIRED)
  }

  const result = await gameService.getUserTopScoresForGameSlug(slug, req.user?.id)
  res.send(result)
}

export default withExceptionHandler(withUser(handler))
