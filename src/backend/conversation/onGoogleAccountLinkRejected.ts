import { ConversationV3 } from 'actions-on-google'
import { sendCommand } from './utils'

export default async (conv: ConversationV3) => {
  sendCommand({
    conv,
    commands: []
  })
}
