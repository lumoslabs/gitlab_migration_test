import { ConversationV3 } from 'actions-on-google'
import {
  sendCommand,
  convToUser,
  Scenes,
} from '@backend/conversation/utils'
//import appSharedActions from '@store/slices/appSharedActions'

export default async (conv: ConversationV3) => {
  console.log('onStartApp', conv.user.params)

  sendCommand({
    conv,
    suppressMic: false,
    commands: [
      //      {
      //        command: appSharedActions.SET_STORE,
      //        payload: {
      //          user: convToUser(conv),
      //        }
      //      },
    ],
    scene: Scenes.Main
  })
}
