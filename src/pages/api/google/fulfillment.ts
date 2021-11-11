import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import {
  conversation,
  StandardResponse,
} from 'actions-on-google'

import onStartApp from '@backend/conversation/onStartApp'
import logger from '@backend/libs/logger'
import onNoMatch from '@backend/conversation/onNoMatch'
import onGoogleAccountLink from '@backend/conversation/onGoogleAccountLink'
import onGoogleAccountLinkRejected from '@backend/conversation/onGoogleAccountLinkRejected'
import rollbar from '@backend/libs/rollbar'
import amplitudeBackendEvent from '@backend/libs/amplitude'
import onMainScene from '@backend/conversation/onMainScene'

const { serverRuntimeConfig } = getConfig()

const conversationApp = conversation({
  clientId: serverRuntimeConfig.google.clientId,
})

// On app launch
conversationApp.handle('StartApp', onStartApp)


conversationApp.handle('MainScene', onMainScene)

// When the user voice input cannot be matched to an intent
conversationApp.handle('NoMatch', onNoMatch)

//Google account link flow
conversationApp.handle('GoogleAccountLink', onGoogleAccountLink)
conversationApp.handle('GoogleAccountLinkRejected', onGoogleAccountLinkRejected)

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await (new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 10001)
  }))

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
