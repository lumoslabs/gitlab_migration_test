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
import onGoogleAccountLink from '@backend/conversation/onGoogleAccountLink'
import onStartAccountLinkingMonologue from '@backend/conversation/onStartAccountLinkingMonologue'
import onGoogleAccountLinkRejected from '@backend/conversation/onGoogleAccountLinkRejected'
import rollbar from '@backend/libs/rollbar'

const { serverRuntimeConfig } = getConfig()

const conversationApp = conversation({
  clientId: serverRuntimeConfig.google.clientId,
})

// On app launch
conversationApp.handle('StartApp', onStartApp)

// When the user voice input cannot be matched to an intent
conversationApp.handle('NoMatch', onNoMatch)

// Launch a game per user request
conversationApp.handle('OpenGame', onOpenGame)

// Back to Main Menu
conversationApp.handle('Home', onHome)
conversationApp.handle('Games', onHome)

// Gameplay
//TODO: move it to frontend
conversationApp.handle('StartGame', onStartGame)
conversationApp.handle('RestartCMM', onStartGame)
conversationApp.handle('ResumeGame', onStartGame)
conversationApp.handle('RestartGame', onStartGame)

// Game Score Screen
conversationApp.handle('PlayScore', onPlayScore)

// Log Out User and close app
conversationApp.handle('UserLogout', onUserLogout)

// Start Training Session
conversationApp.handle('Training', onTraining)

//Google account link flow
conversationApp.handle('GoogleAccountLink', onGoogleAccountLink)
//GoogleAccountLinkRejected
conversationApp.handle('GoogleAccountLinkRejected', onGoogleAccountLinkRejected)

//Should be moved into diff scenes
conversationApp.handle('Yes', onNoMatch)
conversationApp.handle('No', onNoMatch)

//TODO: remove from code and from intence
conversationApp.handle('GameWelcomeMessage', onGameWelcomeMessage)
conversationApp.handle('StartAccountLinkingMonologue', onStartAccountLinkingMonologue)
conversationApp.handle('FEInvokeTTS', onNoMatch)



export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    logger.debug(req.body, `Fulfillment Request: ${req.body?.handler?.name}`)
    const result: StandardResponse = await conversationApp(req.body, req.headers)
    logger.debug(result.body, 'Fulfillment Result')
    return res.status(result.status).json(result.body)
  } catch (e) {
    rollbar?.error(e, req)
    logger.error(e, 'fulfillment.ts')
    return res.send(e)
  }
}
