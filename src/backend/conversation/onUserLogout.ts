import { Canvas, ConversationV3 } from 'actions-on-google'
import { getPublicUrlFromConv } from './utils'

export default async (conv: ConversationV3) => {

  conv.user.params = {}

  conv.add('You’ve been logged out')
  //TODO: test it on device
  //TODO: unlink account
  //TODO: close the app
}
