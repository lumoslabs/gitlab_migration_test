import type { NextApiResponse } from 'next'
import CatalogService from '@backend/services/ConfigService'
import GameService from '@backend/services/GameService'
import withUser, { NextApiRequestWithUser } from '@backend/libs/withUser'
import withExceptionHandler from '@backend/libs/withExceptionHandler'
import { GameEvents } from '@backend/models/gameRun'
import ValidationError from '@backend/errors/ValidationError'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse): Promise<void> => {
  const gameService = new GameService()

  const id = req.body?.id

  const eventName = req.body?.eventName
  if (!Object.values(GameEvents).includes(eventName)) {
    throw new ValidationError('eventName', 'incorrect')
  }

  await gameService.updateGame(
    id,
    eventName,
    req.body?.eventData
  )

  res.send({
    id
  })
}

export default withExceptionHandler(withUser(handler))
