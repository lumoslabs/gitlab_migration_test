import { ConversationV3 } from 'actions-on-google'
import { sendCommand } from '@backend/conversation/utils'
import { ExpectedPhrase } from 'actions-on-google/dist/api/schema'

export default async (conv: ConversationV3) => {
  const phrases = conv.context?.canvas?.state?.continuous_match_phrases
  sendCommand({
    continuousMatchPhrases: phrases as ExpectedPhrase[],
    conv,
  })
}
