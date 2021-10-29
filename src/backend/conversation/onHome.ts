import { ConversationV3 } from 'actions-on-google'
import appSharedActions from '@store/slices/appSharedActions'
import { Pages, sendCommand } from './utils'

export default async (conv: ConversationV3) => {
  conv.add('Back to Main Menu. What would you like to do next?')
  sendCommand({
    conv,
    commands: [
      {
        command: appSharedActions.GO_TO,
        payload: Pages.Home
      }
    ]
  })
}
