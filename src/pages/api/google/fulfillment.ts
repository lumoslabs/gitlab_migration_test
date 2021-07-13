import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import {
  conversation,
  StandardResponse,
} from "actions-on-google"

import onStartApp from '@backend/conversation/onStartApp'
import onOpenGame from '@backend/conversation/onOpenGame'
import logger from '@backend/libs/logger'
import onHome from '@backend/conversation/onHome'
import onStartGame from '@backend/conversation/onStartGame'

const { serverRuntimeConfig } = getConfig()
//TODO: ???? what happend with types with this version of actions-on-google
//@eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const conversationApp = conversation({
  clientId: serverRuntimeConfig.google.client_id,
})

conversationApp.handle('StartApp', onStartApp)
conversationApp.handle('Home', onHome)
conversationApp.handle('OpenGame', onOpenGame)
conversationApp.handle('StartGame', onStartGame)

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    logger.debug(req.body, 'Fulfullment Request')
    const result: StandardResponse = await conversationApp(req.body, req.headers)
    logger.debug(result.body, 'Fulfillment Result')
    return res.status(result.status).json(result.body)
  } catch (e) {
    return res.send(e)
  }
}
