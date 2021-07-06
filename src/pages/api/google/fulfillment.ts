import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import {
  Canvas,
  conversation,
  StandardResponse,
} from '@assistant/conversation'

import appSharedActions from '@store/slices/appSharedActions'

const { serverRuntimeConfig } = getConfig()

const conversationApp = conversation({
  clientId: serverRuntimeConfig.google.client_id,
});

conversationApp.handle('StartApp', async (conv) => {
  conv.add('Welcome to Next js app');

  const canvas = new Canvas({
    url: serverRuntimeConfig.public_url,
    enableFullScreen: true,
    suppressMic: true,
    data: [{
      command: appSharedActions.SET_STARTED
    }],
  });

  conv.add(canvas)

  // conv.user.params = { test: 'params' }
  // conv.session.params = { test: 'session' }

  return canvas;
})

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const result: StandardResponse = await conversationApp(req.body, req.headers)
    console.log('fulfillment result', JSON.stringify(result.body))
    return res.status(result.status).json(result.body)
  } catch (e) {
    return res.send(e)
  }
}
