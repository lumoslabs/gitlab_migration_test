import type { NextApiResponse } from 'next'
import CatalogService from '@backend/services/ConfigService'
import GameService from '@backend/services/GameService'
import withUser, { NextApiRequestWithUser } from '@backend/libs/withUser'

export default withUser(async (req: NextApiRequestWithUser, res: NextApiResponse): Promise<void> => {
  const catalogService = new CatalogService()
  const gameService = new GameService()

  const slug = req.body?.slug

  const game = await catalogService.getCatalogGameBySlug(slug)

  if (!game) {
    throw new Error(`Game ${slug} not found`)
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
