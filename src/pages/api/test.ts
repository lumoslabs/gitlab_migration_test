import ConfigService from '@backend/services/ConfigService'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const service = (new ConfigService)
  const result = await service.getGameContinuousMatchPhrases('color-match-nest')
  res.send(result)
}
