import { ConversationV3 } from 'actions-on-google'
import appSharedActions from '@store/slices/appSharedActions'
import { Pages, sendCommand } from './utils'
import { getUser } from '@store/slices/appSlice'
import { useAppSelector } from '@store/hooks'

export default async (conv: ConversationV3) => {
  const user = useAppSelector(getUser)
  if (user?.isLinked) {
    conv.add('Your account is already linked')
    sendCommand({
      conv,
      commands: [
        {
          command: appSharedActions.GO_TO,
          payload: Pages.Home
        }
      ]
    })
  }  else {
    sendCommand({
      conv,
      commands: [
        {
          command: appSharedActions.GO_TO,
          payload: Pages.AccountLinking
        }
      ]
    })
  }
}
