import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import {
  conversation,
  StandardResponse,
} from 'actions-on-google'

import onStartApp from '@backend/conversation/onStartApp'
import onOpenGame from '@backend/conversation/onOpenGame'
import onPlayScore from '@backend/conversation/onPlayScore'
import logger from '@backend/libs/logger'
import onHome from '@backend/conversation/onHome'
import onStartGame from '@backend/conversation/onStartGame'
import onNoMatch from '@backend/conversation/onNoMatch'
import onGameWelcomeMessage from '@backend/conversation/onGameWelcomeMessage'
import onUserLogout from '@backend/conversation/onUserLogout'
import onTraining from '@backend/conversation/onTraining'
import amplitudeEvent from '@backend/libs/amplitude'

const { serverRuntimeConfig } = getConfig()

const conversationApp = conversation({
  clientId: serverRuntimeConfig.google.clientId,
})

conversationApp.handle('StartApp', onStartApp)
conversationApp.handle('NoMatch', onNoMatch)

conversationApp.handle('OpenGame', onOpenGame)
conversationApp.handle('GameWelcomeMessage', onGameWelcomeMessage)

//
conversationApp.handle('Home', onHome)
conversationApp.handle('Games', onHome)

//
conversationApp.handle('StartGame', onStartGame)
conversationApp.handle('RestartCMM', onStartGame)
conversationApp.handle('ResumeGame', onStartGame)
conversationApp.handle('RestartGame', onStartGame)

conversationApp.handle('PlayScore', onPlayScore)

conversationApp.handle('UserLogout', onUserLogout)

conversationApp.handle('Training', onTraining)

//GoogleAccountLink
//GoogleAccountLinkRejected
//StartAccountLinkingMonologue


//FEInvokeTTS

//Yes
//No
//Help

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    logger.debug(req.body, 'Fulfullment Request')
    amplitudeEvent({
      eventName: req.body?.handler?.name,
      userId: req.body?.user?.params?.id,
      data: req.body
    })
    const result: StandardResponse = await conversationApp(req.body, req.headers)
    logger.debug(result.body, 'Fulfillment Result')
    return res.status(result.status).json(result.body)
  } catch (e) {
    return res.send(e)
  }
}


