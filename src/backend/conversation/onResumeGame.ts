import { ConversationV3 } from 'actions-on-google'
import { sendCommand } from '@backend/conversation/utils'
import appSharedActions from '@store/slices/appSharedActions'

export default async (conv: ConversationV3) => {
  sendCommand({
    conv,
    commands: [
      {
        command: appSharedActions.EMIT_EVENT,
        payload: `onIntentResumeGame`,
      }
    ]
  })
}
