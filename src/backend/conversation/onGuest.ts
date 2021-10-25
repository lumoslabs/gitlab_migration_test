import { ConversationV3 } from 'actions-on-google'
import appSharedActions from '@store/slices/appSharedActions'
import { Pages, sendCommand } from './utils'
import { AccountLinkingStatus } from 'actions-on-google/dist/api/schema'

export default async (conv: ConversationV3) => {
  if (conv.user.accountLinkingStatus === AccountLinkingStatus.Linked) {
    conv.add('Your account is already linked. What would you like to do today?')
    sendCommand({
      conv,
      commands: [
        {
          command: appSharedActions.GO_TO,
          payload: Pages.Home
        }
      ]
    })
  } else {
    sendCommand({
      conv,
      commands: [
        {
          command: appSharedActions.GO_TO,
          payload: Pages.AccountLinking
        }
      ]
    })
  }
}
