import { ConversationV3 } from 'actions-on-google'

export default async (conv: ConversationV3) => {
  conv.user.params = Object.keys(conv.user.params).reduce((accum, value) => {
    accum[value] = null
    return accum
  }, {})
  conv.add('Bye')
  //TODO: test it on device
  //TODO: unlink account
  //TODO: close the app
}
