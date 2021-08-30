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
import onGuest from '@backend/conversation/onGuest'
import onStartGame from '@backend/conversation/onStartGame'
import onNoMatch from '@backend/conversation/onNoMatch'
import onTraining from '@backend/conversation/onTraining'
import onGoogleAccountLink from '@backend/conversation/onGoogleAccountLink'
import onGoogleAccountLinkRejected from '@backend/conversation/onGoogleAccountLinkRejected'
import rollbar from '@backend/libs/rollbar'
import onYes from '@backend/conversation/onYes'
import onNo from '@backend/conversation/onNo'
import amplitudeBackendEvent from '@backend/libs/amplitude'
import onAgeGateResult from '@backend/conversation/onAgeGateResult'
import onMainScene from '@backend/conversation/onMainScene'
import onRestartCMM from '@backend/conversation/onRestartCMM'
import onHelp from '@backend/conversation/onHelp'
import onResumeGame from '@backend/conversation/onResumeGame'
import onRestartGame from '@backend/conversation/onRestartGame'

const { serverRuntimeConfig } = getConfig()

const conversationApp = conversation({
  clientId: serverRuntimeConfig.google.clientId,
})

// On app launch
conversationApp.handle('StartApp', onStartApp)


conversationApp.handle('MainScene', onMainScene)

// When the user voice input cannot be matched to an intent
conversationApp.handle('NoMatch', onNoMatch)

// Launch a game per user request
conversationApp.handle('OpenGame', onOpenGame)

// Back to Main Menu
conversationApp.handle('Home', onHome)
conversationApp.handle('Games', onHome)

// Link account or show Account Info Modal
conversationApp.handle('Guest', onGuest)

// Gameplay
//TODO: move it to frontend
conversationApp.handle('StartGame', onStartGame)
conversationApp.handle('RestartCMM', onRestartCMM)
conversationApp.handle('ResumeGame', onResumeGame)
conversationApp.handle('RestartGame', onRestartGame)

// Game Score Screen
conversationApp.handle('PlayScore', onPlayScore)

// Start Training Session
conversationApp.handle('Training', onTraining)

//Google account link flow
conversationApp.handle('GoogleAccountLink', onGoogleAccountLink)
conversationApp.handle('GoogleAccountLinkRejected', onGoogleAccountLinkRejected)

conversationApp.handle('AgeGateResult', onAgeGateResult)

//TODO: should be moved to frontend
conversationApp.handle('Yes', onYes)
conversationApp.handle('No', onNo)
conversationApp.handle('Help', onHelp)

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    logger.debug(`Fulfillment Request ${req.body?.handler?.name}`)

    amplitudeBackendEvent({
      eventName: `intent_${req.body?.handler?.name}`,
      userId: req.body?.user?.params?.id,
      data: req.body
    })

    const result: StandardResponse = await conversationApp(req.body, req.headers)
    logger.debug(`Fulfillment Result ${req.body?.handler?.name}`)
    return res.status(result.status).json(result.body)
  } catch (e) {
    rollbar?.error(e, req)
    logger.error(e, 'fulfillment.ts')
    return res.status(500).send({ error: e.message || e })
  }
}
