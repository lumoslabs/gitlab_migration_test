import { ConversationV3 } from "actions-on-google";
import { sendCommand } from '@backend/conversation/utils'
import appSharedActions from '@store/slices/appSharedActions'

export default async (conv: ConversationV3) => {
  conv.add('Welcome to Next js app');

  //  conv.user.params = conv.request.user
  /*
  */
  console.log('conv.user.params', conv.user.params)
  console.log('conv.session.params', conv.session.params)

  conv.session.params.i = (conv?.session?.params?.i || 0) + 1
  conv.user.params.i = (conv?.user?.params?.i || 0) + 1;

  sendCommand({
    conv,
    command: appSharedActions.SET_STARTED,
  })
}
