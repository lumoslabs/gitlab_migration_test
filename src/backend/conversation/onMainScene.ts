import { ConversationV3 } from 'actions-on-google'
import { sendConv } from './utils'

export default async (conv: ConversationV3) => {
  sendConv({
    conv
  })
}
