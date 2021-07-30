import { Canvas, ConversationV3 } from 'actions-on-google'
import { getPublicUrlFromConv } from './utils'

export default async (conv: ConversationV3) => {

  conv.user.params = {}

  conv.add('Bye')
  //TODO: test it on device
  //TODO: unlink account
  //TODO: close the app
}
