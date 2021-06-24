import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import {
  Canvas,
  conversation,
  StandardResponse,
} from '@assistant/conversation'

const { serverRuntimeConfig } = getConfig()

const conversationApp = conversation({
  clientId: serverRuntimeConfig.google.client_id,
});

conversationApp.handle('StartApp', async (conv) => {
  conv.add('Welcome to Next js app');

  const canvas = new Canvas({
    url: serverRuntimeConfig.public_url,
    enableFullScreen: true,
    suppressMic: false,
    data: ['test result string']
  });

  conv.add(canvas)
  return canvas;
})

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const result: StandardResponse = await conversationApp(req.body, req.headers)
    return res.status(result.status).json(result.body)
  } catch (e) {
    return res.send(e)
  }
}
