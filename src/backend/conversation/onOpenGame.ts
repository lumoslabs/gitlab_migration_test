import { ConversationV3 } from 'actions-on-google'
import CatalogService from '@backend/services/ConfigService'
import appSharedActions from '@store/slices/appSharedActions'
import { getRandomElement, sendCommand } from './utils'

export default async (conv: ConversationV3) => {
  const gameNameResolved = conv?.intent?.params?.game_name?.resolved?.toLowerCase()
  const games = await (new CatalogService()).getVoiceGameMap()
  const gameSlug = games[gameNameResolved] ? games[gameNameResolved] : getRandomElement<string>(games)
  sendCommand({
    conv,
    commands: [
      {
        command: appSharedActions.GO_TO,
        payload: `/game/${gameSlug}`
      }
    ],
    suppressMic: true,
  })
}
