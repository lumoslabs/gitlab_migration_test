import { ConversationV3 } from 'actions-on-google'
import appSharedActions from '@store/slices/appSharedActions'
import { sendCommand } from './utils'

export default async (conv: ConversationV3) => {
  sendCommand({
    conv,
    commands: [
      {
        command: appSharedActions.GO_TO,
        payload: '/home'
      }
    ]
  })
}
