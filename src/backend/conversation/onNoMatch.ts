import { ConversationV3 } from 'actions-on-google'
import { sendConv } from './utils'

export default async (conv: ConversationV3) => {
  conv.add('Sorry, what was that?')
  sendConv({
    conv,
  })
}
