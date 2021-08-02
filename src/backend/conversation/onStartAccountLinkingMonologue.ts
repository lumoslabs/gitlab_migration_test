import { ConversationV3 } from 'actions-on-google'
import { VerificationStatus } from 'actions-on-google/dist/api/schema'
import { sendCommand } from './utils'

export default async (conv: ConversationV3) => {
  if (conv.user?.verificationStatus === VerificationStatus.Guest) {
    conv.add(`You're currently in guest mode. If you would like to save your scores and progress, 
      check your Google Voice match settings and restart Lumosity. You can say "Home" to go to the main menu.
    `)
  } else {
    conv.add(`You are currently playing as a guest user. 
      To save scores and progress, you need to link your Lumosity account. 
      Press connect to link your account.
    `)
  }

  sendCommand({
    conv,
  })
}
