import { ConversationV3 } from 'actions-on-google'
import { sendCommand } from '@backend/conversation/utils'
import { ExpectedPhrase } from 'actions-on-google/dist/api/schema'
import appSharedActions from '@store/slices/appSharedActions'

export default async (conv: ConversationV3) => {
  const phrases = conv.context?.canvas?.state?.continuous_match_phrases
  sendCommand({
    continuousMatchPhrases: phrases as ExpectedPhrase[],
    conv,
    commands: [
      {
        command: appSharedActions.EMIT_EVENT,
        payload: `onIntentRestartCMM`,
      }
    ]
  })
}
