import GameService from '@backend/services/GameService'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const game = new GameService()
  const result = await game.getUserTopScoresForGameSlug('color-match-nest', 'guest')
  res.send({
    result
  })
}
