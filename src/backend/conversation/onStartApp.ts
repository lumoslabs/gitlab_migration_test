import { ConversationV3 } from 'actions-on-google'
import {
  sendConv,
  Scenes,
  getPublicUrlFromConv,
} from '@backend/conversation/utils'
import { VerificationStatus } from 'actions-on-google/dist/api/schema'

export default async (conv: ConversationV3) => {
  sendConv({
    conv,
    data: {
      isGuest: conv.user.verificationStatus === VerificationStatus.Guest,
      baseUrl: getPublicUrlFromConv(conv)
    },
    scene: Scenes.Main
  })
}
