import { ConversationV3 } from 'actions-on-google'
import { sendCommand } from './utils'

export default async (conv: ConversationV3) => {
  //  const training = getTraining(conv)

  /*
    if (!conv.session.params.isWelcomeMessage) {
      conv.session.params.isWelcomeMessage = true
      if (getIsFirstLogin(conv) && training?.games?.length > 0) {
        conv.add('Welcome to Lumosity. You can say play a game or do a workout. What would you like to do today?')
      } else {
        if (conv.user.accountLinkingStatus === AccountLinkingStatus.Linked || training.games.length <= 0) {
          conv.add('Welcome back. What would you like to do today?')
        }
        else {
          conv.add(`Welcome back. By the way, your score and progress will not be saved until you link your Lumosity account.
           If you would like to link your Lumosity account, you can say Guest or tap “Guest” on the Main Menu. 
           What would you like to do today?`)
        }
      }
    }
  */

  sendCommand({
    conv,
    commands: []
  })
}
