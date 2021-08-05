import { ConversationV3 } from 'actions-on-google'
import { Pages, sendCommand } from '@backend/conversation/utils'
import appSharedActions from '@store/slices/appSharedActions'

export default async (conv: ConversationV3) => {
  sendCommand({
    conv,
    suppressMic: true,
    commands: [
      {
        command: appSharedActions.GO_TO,
        payload: Pages.Training,
      }
    ]
  })
}
