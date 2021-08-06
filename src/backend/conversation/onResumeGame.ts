import { ConversationV3 } from 'actions-on-google'
import { sendCommand } from '@backend/conversation/utils'
import ConfigService from '@backend/services/ConfigService'
import { ExpectedPhrase } from 'actions-on-google/dist/api/schema'
import appSharedActions from '@store/slices/appSharedActions'

export default async (conv: ConversationV3) => {
  const gameSlug = conv.context?.canvas?.state?.slug
  const phrases = await (new ConfigService()).getGameContinuousMatchPhrases(gameSlug)
  sendCommand({
    continuousMatchPhrases: phrases as ExpectedPhrase[],
    conv,
    commands: [
      {
        command: appSharedActions.EMIT_EVENT,
        payload: `onIntentResumeGame`,
      }
    ]
  })
}
