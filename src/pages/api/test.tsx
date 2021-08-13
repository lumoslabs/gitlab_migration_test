import type { NextApiResponse, NextApiRequest } from 'next'
import withExceptionHandler from '@backend/libs/withExceptionHandler'
import ConfigService from '@backend/services/ConfigService'

const handler = (async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  //  const service = new ConfigService()
  //  const catalog = await service.getCatalogGames()
  //  const cmm = await service.getGameContinuousMatchPhrases('color-match-nest')
  //  const games = await service.getVoiceGameMap()

  const games = await (new ConfigService()).getCatalogGames()
  res.send({
    games
  })
})

export default withExceptionHandler(handler)
