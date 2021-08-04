//MOVED TO FRONTEND
//TODO: remove it from gactions
import { ConversationV3 } from 'actions-on-google'
import { sendCommand } from '@backend/conversation/utils'

export default async (conv: ConversationV3) => {
  const gameName = conv.context?.canvas?.state?.name

  conv.add(`Okay. Let's play ${gameName}`)

  sendCommand({
    suppressMic: true,
    conv
  })
}

