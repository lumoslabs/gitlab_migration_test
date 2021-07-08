import { ConversationV3 } from '@assistant/conversation';
import { sendCommand } from '@backend/conversation/utils'
import appSharedActions from '@store/slices/appSharedActions'

export default async (conv: ConversationV3) => {
  conv.add('Welcome to Next js app');
  sendCommand({
    conv,
    command: appSharedActions.SET_STARTED,
  })
}
