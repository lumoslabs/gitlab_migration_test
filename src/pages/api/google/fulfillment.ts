import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import {
  conversation,
  StandardResponse,
} from 'actions-on-google'

import onStartApp from '@backend/conversation/onStartApp'
import onOpenGame from '@backend/conversation/onOpenGame'
import logger from '@backend/libs/logger'
import onHome from '@backend/conversation/onHome'

const { serverRuntimeConfig } = getConfig()
const conversationApp = conversation({
  clientId: serverRuntimeConfig.google.client_id,
})

conversationApp.handle('StartApp', onStartApp)
conversationApp.handle('OpenGame', onOpenGame)
conversationApp.handle('Home', onHome)

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    logger.debug('fulfillment request', JSON.stringify(req.body))
    const result: StandardResponse = await conversationApp(req.body, req.headers)
    logger.debug('fulfillment result', JSON.stringify(result.body))
    return res.status(result.status).json(result.body)
  } catch (e) {
    return res.send(e)
  }
}
