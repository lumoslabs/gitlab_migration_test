import { ConversationV3 } from 'actions-on-google'
import { sendCommand, getPublicUrlFromConv } from '@backend/conversation/utils'
import appSharedActions from '@store/slices/appSharedActions'

export default async (conv: ConversationV3) => {
  conv.add('Welcome to Lumosity. You can say play a game or do a workout. What would you like to do today?')
  //TODO: auth logic
  sendCommand({
    conv,
    command: appSharedActions.SET_STARTED,
    payload: {
      baseUrl: getPublicUrlFromConv(conv)
    }
  })
}
