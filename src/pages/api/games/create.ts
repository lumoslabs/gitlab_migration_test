import type { NextApiResponse } from 'next'
import CatalogService from '@backend/services/ConfigService'
import GameService from '@backend/services/GameService'
import withUser, { NextApiRequestWithUser } from '@backend/libs/withUser'
import withExceptionHandler from '@backend/libs/withExceptionHandler'
import ValidationError from '@backend/errors/ValidationError'

const handler = (async (req: NextApiRequestWithUser, res: NextApiResponse): Promise<void> => {
  const catalogService = new CatalogService()
  const gameService = new GameService()
  const slug = req.body?.slug
  if (!slug) {
    throw new ValidationError('slug', 'required')
  }
  const game = await catalogService.getCatalogGameBySlug(slug)
  if (!game) {
    throw new ValidationError('slug', 'incorrect')
  }
  const id = await gameService.createGame({
    game_version: game.values?.last_version?.id,
    game_slug: game.id,
    user_id: req.user?.id
  })
  res.send({
    id
  })
})

export default withExceptionHandler(withUser(handler))
