import { ConversationV3 } from 'actions-on-google';
import { sendCommand } from '@backend/conversation/utils'
import ConfigService from '@backend/services/ConfigService';
import { ExpectedPhrase } from "actions-on-google/dist/api/schema"

export default async (conv: ConversationV3) => {
  conv.add('Start game event!');
  //@ts-ignore
  const gameSlug = conv.context?.canvas?.state?.slug
  const phrases = await (new ConfigService()).getGameContinuousMatchPhrases(gameSlug)
  sendCommand({
    continuousMatchPhrases: phrases as ExpectedPhrase[],
    conv,
  })
}
